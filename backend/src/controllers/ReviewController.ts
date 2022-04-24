import { Request, Response } from 'express';
import { toCamel, toSnake } from 'snake-camel';

import CustomerController from './CustomerController';
import databaseService from '../services/DatabaseService';
import { badRequest, internalError } from '../helpers/http.helper';
import { userPicture } from '../helpers/image.helper';
import ProfessionalController from './ProfessionalController';
import ReviewType from '../types/review.type';

export default class ReviewController {
  public static async get(req: Request, res: Response) {
    const { professionalId, rating } = req.query;

    const reviews = await ReviewController.getReviewsByProfessionalId(
      +professionalId,
      +rating
    );

    if (res.locals.user && res.locals.user.type === 'CUSTOMER')
      reviews.sort((a, _) => (a.customerId === res.locals.user.id ? -1 : 0));

    return res.status(200).json(reviews);
  }

  public static async create(req: Request, res: Response) {
    const review = req.body;
    const customer = res.locals.user;
    review.customerId = customer.id;

    const professionalExists = await ProfessionalController.professionalExists(
      review.professionalId
    );
    if (!professionalExists) return badRequest(res, 'professionalId inválido');

    if (await ReviewController.reviewExists(review.professionalId, customer.id))
      return badRequest(res, 'Você já avaliou este profissional.');

    try {
      await ReviewController.insertReview(review);

      review.customerName = customer.name;
      review.customerPicturePath = customer.picturePath;
      delete review.customerId;

      return res.status(201).json(review);
    } catch (err) {
      console.error(err);

      return internalError(res, 'Erro ao criar avaliação de profissional');
    }
  }

  private static async insertReview(review: ReviewType) {
    return databaseService.connection.table('review').insert(toSnake(review));
  }

  private static async getReviewsByProfessionalId(
    professionalId: number,
    rating?: number
  ) {
    const reviews = await databaseService.connection
      .table('review')
      .select('rating', 'comment', 'customer_id')
      .where('professional_id', professionalId)
      .modify((queryBuilder) => {
        if (rating) queryBuilder.andWhere('rating', '=', rating);
      })
      .then((rows) => rows.map(toCamel) as any[]);

    for (const r of reviews) {
      const { fullName, pictureName } =
        await CustomerController.getCustomerById(r.customerId);

      r.customerName = fullName;
      r.customerPicturePath = userPicture(pictureName);
    }

    return reviews;
  }

  private static async reviewExists(
    professionalId: number,
    customerId: number
  ): Promise<boolean> {
    return databaseService.connection
      .table('review')
      .where('professional_id', professionalId)
      .andWhere('customer_id', customerId)
      .then((rows) => rows.length > 0);
  }
}
