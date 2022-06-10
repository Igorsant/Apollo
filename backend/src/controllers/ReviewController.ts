import { Request, Response } from 'express';

import { badRequest, forbidden, internalError } from '../helpers/http.helper';
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

    review.lastModified = new Date().toISOString();

    try {
      await reviewRepository.insert(review);

      const newRating = await calculateAverageRating(review.professionalId);

      await professionalRepository.updateAverageRating(
        review.professionalId,
        newRating
      );

      review.customerName = customer.name;
      review.customerPicturePath = customer.picturePath;
      delete review.customerId;

      return res.status(201).json(review);
    } catch (err) {
      console.error(err);

      return internalError(res, 'Erro ao criar avaliação de profissional');
    }
  }

  public static async update(req: Request, res: Response) {
    const { reviewId } = req.params;
    const review = req.body;
    const { id: userId } = res.locals.user;

    const professionalExists = await professionalRepository.exists(
      review.professionalId
    );
    if (!professionalExists) return badRequest(res, 'professionalId inválido');

    if (!(await reviewRepository.reviewExists(+reviewId)))
      return badRequest(res, 'reviewId inválido');

    if (!(await reviewRepository.userOwnsReview(userId, +reviewId)))
      return forbidden(res);

    review.lastModified = new Date().toISOString();

    try {
      await reviewRepository.update(+reviewId, review);

      const customer = res.locals.user;
      review.customerName = customer.name;
      review.customerPicturePath = customer.picturePath;

      const newRating = await calculateAverageRating(review.professionalId);

      await professionalRepository.updateAverageRating(
        review.professionalId,
        newRating
      );

      return res.status(201).json(review);
    } catch (err) {
      console.error(err);

      return internalError(res, 'Erro ao alterar avaliação de profissional');
    }
  }

  public static async delete(req: Request, res: Response) {
    const { reviewId } = req.params;
    const { id: userId } = res.locals.user;

    if (!(await reviewRepository.reviewExists(+reviewId)))
      return badRequest(res, 'reviewId inválido');

    if (!(await reviewRepository.userOwnsReview(userId, +reviewId)))
      return forbidden(res);

    try {
      await reviewRepository.delete(+reviewId);

      return res.sendStatus(204);
    } catch (err) {
      console.error(err);

      return internalError(res, 'Erro ao remover avaliação de profissional');
    }
  }
}

async function calculateAverageRating(professionalId: number): Promise<number> {
  const reviews = await reviewRepository.findByProfessionalId(professionalId);

  const ratingSum = reviews
    .map((r) => r.rating)
    .reduce((total, rate) => total + rate);

  // multiplica e divide por 2 pra arredondar pro ~0.5 mais próximo
  return Math.round((ratingSum / reviews.length) * 2) / 2;
}
