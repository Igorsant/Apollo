import type { Knex } from 'knex';
import { env } from 'process';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'apollo',
      user: 'apollo_user',
      password: env['DB_PASSWORD'],
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

export default config;
