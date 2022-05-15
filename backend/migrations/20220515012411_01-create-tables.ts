import { Knex } from 'knex';
import path from 'path';

import { getSqlFromFile } from '../src/helpers/knex.helper';

export async function up(knex: Knex): Promise<void> {
  const createTablesFile = path.join(__dirname, '01-create-tables.sql');
  const createTablesSQL = await getSqlFromFile(createTablesFile);

  return knex.raw(createTablesSQL);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('favorite')
    .dropTable('scheduling_service')
    .dropTable('service')
    .dropTable('scheduling')
    .dropTable('review')
    .dropTable('workhour')
    .dropTable('professional')
    .dropTable('customer')
    .dropTable('workplace')
    .dropTable('phone');
}
