import { Knex } from 'knex';
import path from 'path';
import { promises } from 'fs';

export async function seed(knex: Knex): Promise<void> {
  const workplaceFile = path.join(__dirname, 'sql', 'Workplace.sql');
  const workplaceSql = await promises
    .readFile(workplaceFile)
    .then((fb) => fb.toString());

  const workplacePhonesFile = path.join(
    __dirname,
    'sql',
    'Workplace_Phones.sql'
  );
  const workplacePhonesSql = await promises
    .readFile(workplacePhonesFile)
    .then((fb) => fb.toString());

  await knex.raw(workplacePhonesSql);
  await knex.raw(workplaceSql);
}
