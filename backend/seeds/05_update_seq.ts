import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // como as seeds adicionam na tabela com o ID manualmente, a sequencia de ids não é
  // automaticamente atualizada, entao é preciso atualizar na mão
  const seqTables = [
    'customer',
    'phone',
    'professional',
    'review',
    'scheduling',
    'service',
    'workhour',
    'workplace'
  ];

  const promises = [];

  for (const table of seqTables) {
    promises.push(
      knex.raw(`SELECT setval('${table}_id_seq', max(id)) FROM ${table};`)
    );
  }

  await Promise.all(promises);
}
