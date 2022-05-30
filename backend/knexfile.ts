import type { Knex } from 'knex';
import { env } from 'process';

if (!env['NODE_ENV'] || env['NODE_ENV'].toUpperCase() != 'PRODUCTION') {
  require('dotenv').config();
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: env['DB_NAME'],
      user: env['DB_USER'],
      password: env['DB_PASSWORD'],
      port: Number.parseInt(env['DB_PORT']),
      host: env['DB_HOST']
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  production: {
    client: 'postgresql',
    connection: env['DATABASE_URL'],
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};

export default config;
