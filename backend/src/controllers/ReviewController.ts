import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import databaseService from '../services/DatabaseService';

export default class ReviewSchema {
  public static async get(req: Request, res: Response) {
    const { professionalId, rating } = req.query;

    return databaseService.connection.transaction(async (trx) => {
      const reviews = await trx
        .table('review')
        .select('rating', 'comment')
        .where('professional_id', +professionalId);

      const response = res.status(200);

      if (!rating) return response.json({ reviews });

      return response.json({
        reviews: reviews.filter((r) => r.rating >= rating)
      });
    });
  }

  public static async create(req: Request, res: Response) {
    const { professionalId, rating, comment } = req.body;

    const [_, token] = req.headers.authorization.split(' ');

    if (!token) {
      return res.status(400);
    }

    const user = jwt.verify(token, process.env.JWT_LOGIN_SECRET);
    if (!user) return res.status(400);

    const { id } = Object(user);

    return databaseService.connection.transaction(async (trx) => {
      const customer = await trx('customer').where('id', id);
      if (!customer) return res.status(400);

      const professional = await trx('professional')
        .where('id', professionalId)
        .returning('id');
      if (!professional) return res.status(400);

      const review = {
        customer_id: id,
        professional_id: professionalId,
        rating,
        comment
      };

      try {
        await trx('review').insert(review);
      } catch (err) {
        console.error(err);

        return res
          .status(400)
          .json({ error: 'Erro ao criar avaliação de profissional' });
      }

      await trx.commit();
      return res.sendStatus(201);
    });
  }
}
