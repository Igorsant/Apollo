import { Knex } from 'knex';
import path from 'path';
import { promises } from 'fs';

export async function seed(knex: Knex): Promise<void> {
  const professionalFile = path.join(__dirname, 'sql', 'Professional.sql');
  const professionalSql = await promises
    .readFile(professionalFile)
    .then((fb) => fb.toString());

  const professionalPhonesFile = path.join(
    __dirname,
    'sql',
    'Professional_Phones.sql'
  );
  const professionalPhonesSql = await promises
    .readFile(professionalPhonesFile)
    .then((fb) => fb.toString());

  const workhourFile = path.join(__dirname, 'sql', 'WorkHour.sql');
  const workhourSql = await promises
    .readFile(workhourFile)
    .then((fb) => fb.toString());

  const serviceFile = path.join(__dirname, 'sql', 'Service.sql');
  const serviceSql = await promises
    .readFile(serviceFile)
    .then((fb) => fb.toString());

  await knex.raw(professionalPhonesSql);
  await knex.raw(professionalSql);
  await knex.raw(workhourSql);
  await knex.raw(serviceSql);
}
