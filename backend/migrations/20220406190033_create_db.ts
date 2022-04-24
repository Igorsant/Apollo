import { promises } from 'fs';
import { Knex } from 'knex';
import path from 'path';

export async function up(knex: Knex): Promise<void> {
  const filePath = path.join(__dirname, '01-create-tables.sql');
  const fileBuffer = await promises.readFile(filePath);
  const sql = fileBuffer.toString();

  return knex.raw(sql);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('favorite')
    .dropTable('schedulling_service')
    .dropTable('service')
    .dropTable('schedulling')
    .dropTable('review')
    .dropTable('workhour')
    .dropTable('professional')
    .dropTable('customer')
    .dropTable('workplace')
    .dropTable('phone');
}
