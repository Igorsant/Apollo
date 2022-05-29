import { Knex } from 'knex';
import path from 'path';
import { promises } from 'fs';

export async function seed(knex: Knex): Promise<void> {
  const customerFile = path.join(__dirname, 'sql', 'Customer.sql');
  const customerSql = await promises
    .readFile(customerFile)
    .then((fb) => fb.toString());

  const customerPhonesFile = path.join(__dirname, 'sql', 'Customer_Phones.sql');
  const customerPhonesSql = await promises
    .readFile(customerPhonesFile)
    .then((fb) => fb.toString());

  await knex.raw(customerPhonesSql);
  await knex.raw(customerSql);
}
