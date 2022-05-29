import { Knex } from 'knex';
import path from 'path';
import { promises } from 'fs';

export async function seed(knex: Knex): Promise<void> {
  const reviewFile = path.join(__dirname, 'sql', 'Review.sql');
  const reviewSql = await promises
    .readFile(reviewFile)
    .then((fb) => fb.toString());

  await knex.raw(reviewSql);
}
