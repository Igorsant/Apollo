import { Knex } from 'knex';
import path from 'path';

import { getSqlFromFile } from '../src/helpers/knex.helper';

export async function up(knex: Knex): Promise<void> {
  const insertMockPhonesFile = path.join(__dirname, '02-insert-mock-phone.sql');
  const insertMockPhonesSQL = await getSqlFromFile(insertMockPhonesFile);

  return knex.raw(insertMockPhonesSQL);
}

export async function down(knex: Knex): Promise<void> {
  const deleteMockPhoneFile = path.join(__dirname, '03-delete-mock-phone.sql');
  const deleteMockPhoneSQL = await getSqlFromFile(deleteMockPhoneFile);

  return knex.raw(deleteMockPhoneSQL);
}
