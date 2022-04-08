//import { Knex } from 'knex';
import Knex, { Knex as KnexType } from 'knex';
import { env } from 'process';

import config from '../../knexfile';

class DatabaseService {
  private pg: KnexType;
  private knexConfig: KnexType.Config = config[env.NODE_ENV];

  public connect(): Promise<KnexType> {
    return new Promise((resolve, reject) => {
      this.pg = Knex(this.knexConfig);

      this.pg
        .raw('select 1+1;') // checa se a conexão foi efetuada com sucesso executando uma query simples
        .then(() => resolve(this.pg))
        .catch((err) => reject(err));
    });
  }

  public get connection(): KnexType {
    if (!this.pg) throw new Error('Banco de dados não está conectado');

    return this.pg;
  }
}

const databaseService = new DatabaseService();

export default databaseService;
