import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE table favorite CASCADE;');
  await knex.raw('TRUNCATE table scheduling_service CASCADE;');
  await knex.raw('TRUNCATE table service CASCADE;');
  await knex.raw('TRUNCATE table scheduling CASCADE;');
  await knex.raw('TRUNCATE table review CASCADE;');
  await knex.raw('TRUNCATE table workhour CASCADE;');
  await knex.raw('TRUNCATE table professional CASCADE;');
  await knex.raw('TRUNCATE table customer CASCADE;');
  await knex.raw('TRUNCATE table workplace CASCADE;');
  await knex.raw('TRUNCATE table phone CASCADE;');
}
