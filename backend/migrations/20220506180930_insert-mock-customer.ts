import { Knex } from 'knex';
import path from 'path';

import { getSqlFromFile } from '../src/helpers/knex.helper';

export async function up(knex: Knex): Promise<void> {
  const insertMockCustomersFile = path.join(
    __dirname,
    '04-insert-mock-customer.sql'
  );
  const insertMockCustomersSQL = await getSqlFromFile(insertMockCustomersFile);

  return knex.raw(insertMockCustomersSQL);
}

export async function down(knex: Knex): Promise<void> {
  const deleteMockCustomerFile = path.join(
    __dirname,
    '05-delete-mock-customer.sql'
  );
  const deleteMockCustomerSQL = await getSqlFromFile(deleteMockCustomerFile);

  return knex.raw(deleteMockCustomerSQL);
}
