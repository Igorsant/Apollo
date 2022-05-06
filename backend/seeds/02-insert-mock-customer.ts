import { Knex } from 'knex';
import path from 'path';

import { getSqlFromFile } from '../src/helpers/knex.helper';

export async function seed(knex: Knex): Promise<void> {
  await knex.schema.raw('TRUNCATE TABLE Customer CASCADE;');

  const insertMockCustomersFile = path.join(
    __dirname,
    '02-insert-mock-customer.sql'
  );
  const insertMockCustomersSQL = await getSqlFromFile(insertMockCustomersFile);

  await knex.schema.raw(insertMockCustomersSQL);
}
