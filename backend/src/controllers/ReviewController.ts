import { Request, Response } from 'express';

import { badRequest, internalError } from '../helpers/http.helper';
import professionalRepository from '../repositories/professional.repository';
import reviewRepository from '../repositories/review.repository';

export default class ReviewController {
  public static async get(req: Request, res: Response) {
    const { professionalId, rating } = req.query;

    const reviews = await reviewRepository.findByProfessionalId(
      +professionalId,
      +rating
    );

    if (res.locals.user && res.locals.user.type === 'CUSTOMER')
      reviews.sort((a, _) => (a.customerId === res.locals.user.id ? -1 : 0));

    reviews.map((r) => delete r.customerId);

    return res.status(200).json(reviews);
  }

  public static async create(req: Request, res: Response) {
    const review = req.body;
    const customer = res.locals.user;
    review.customerId = customer.id;

    const professionalExists = await professionalRepository.exists(
      review.professionalId
    );
    if (!professionalExists) return badRequest(res, 'professionalId inválido');

    if (await reviewRepository.exists(review.professionalId, customer.id))
      return badRequest(res, 'Você já avaliou este profissional.');

    try {
      await reviewRepository.insert(review);

      review.customerName = customer.name;
      review.customerPicturePath = customer.picturePath;
      delete review.customerId;

      return res.status(201).json(review);
    } catch (err) {
      console.error(err);

      return internalError(res, 'Erro ao criar avaliação de profissional');
    }
  }
}
