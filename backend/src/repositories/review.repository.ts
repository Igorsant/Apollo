import { toCamel, toSnake } from 'snake-camel';

import customerRepository from './customer.repository';
import databaseService from '../services/DatabaseService';
import { userPicture } from '../helpers/image.helper';
import ReviewType from '../types/review.type';

class ReviewRepository {
  private tableName = 'review';

  public async insert(review: ReviewType) {
    return databaseService.connection
      .table(this.tableName)
      .insert(toSnake(review));
  }

  public async update(id: number, review: ReviewType) {
    return databaseService.connection
      .table(this.tableName)
      .where('id', id)
      .update({
        comment: review.comment,
        rating: review.rating,
        last_modified: review.lastModified
      });
  }

  public async findByProfessionalId(professionalId: number, rating?: number) {
    const reviews = await databaseService.connection
      .table(this.tableName)
      .select('id', 'rating', 'comment', 'customer_id', 'last_modified')
      .where('professional_id', professionalId)
      .modify((queryBuilder) => {
        if (rating) queryBuilder.andWhere('rating', '=', rating);
      })
      .then((rows) => rows.map(toCamel) as any[]);

    for (const r of reviews) {
      const { fullName, pictureName } = await customerRepository.findById(
        r.customerId
      );

      r.customerName = fullName;
      r.customerPicturePath = userPicture(pictureName);
    }

    return reviews;
  }

  public async exists(
    professionalId: number,
    customerId: number
  ): Promise<boolean> {
    return databaseService.connection
      .table(this.tableName)
      .where('professional_id', professionalId)
      .andWhere('customer_id', customerId)
      .then((rows) => rows.length > 0);
  }

  public async reviewExists(reviewId: number): Promise<Boolean> {
    return databaseService.connection
      .table(this.tableName)
      .where('id', reviewId)
      .then((rows) => rows.length > 0);
  }

  public async delete(reviewId: number) {
    return databaseService.connection
      .table(this.tableName)
      .where('id', reviewId)
      .delete();
  }

  public async userOwnsReview(
    userId: number,
    reviewId: number
  ): Promise<boolean> {
    return databaseService.connection
      .table(this.tableName)
      .where('id', reviewId)
      .andWhere('customer_id', userId)
      .then((rows) => rows.length > 0);
  }

  public async numberOfReviews(professionalId: number): Promise<number> {
    return databaseService.connection
      .table(this.tableName)
      .select('id')
      .where('professional_id', professionalId)
      .then((rows) => rows.length);
  }
}

const reviewRepository = new ReviewRepository();

export default reviewRepository;
