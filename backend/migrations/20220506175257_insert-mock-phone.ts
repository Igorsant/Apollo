import { Knex } from 'knex';
import path from 'path';

import { getSqlFromFile } from '../src/helpers/knex.helper';

export async function up(knex: Knex): Promise<void> {
  const createTablesFile = path.join(__dirname, '02-insert-mock-phone.sql');
  const createTablesSQL = await getSqlFromFile(createTablesFile);

  return knex.raw(createTablesSQL);
}

export async function down(knex: Knex): Promise<void> {
  const deleteMockPhoneSQL = await getSqlFromFile('03-delete-mock-phone.sql');
  return knex.raw(deleteMockPhoneSQL);
}
