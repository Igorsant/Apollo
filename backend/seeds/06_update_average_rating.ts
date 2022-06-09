import { Knex } from 'knex';

// Atualiza o campo averageRating do profissional
export async function seed(knex: Knex): Promise<void> {
  const professionals = await knex('professional');

  for (const p of professionals) {
    const reviews = await knex('review').where('professional_id', p.id);

    const ratingSum = reviews
      .map((r) => r.rating)
      .reduce((total, rate) => total + rate);
    const averageRating = Math.round((ratingSum / reviews.length) * 2) / 2;

    p.average_rating = averageRating;

    await knex('professional').update(p).where('id', p.id);
  }
}
