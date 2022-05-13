import { Knex } from 'knex';
import path from 'path';

import { getSqlFromFile } from '../src/helpers/knex.helper';

export async function seed(knex: Knex): Promise<void> {
  await knex.schema.raw('TRUNCATE TABLE Phone CASCADE;');

  const insertMockPhonesFile = path.join(__dirname, '01-insert-mock-phone.sql');
  const insertMockPhonesSQL = await getSqlFromFile(insertMockPhonesFile);

  await knex.schema.raw(insertMockPhonesSQL);
}
