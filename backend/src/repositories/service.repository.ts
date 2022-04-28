import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import ServiceType from '../types/service.type';

class ServiceRepository {
  private tableName = 'service';

  public async insertAll(
    services: ServiceType[],
    trx: Knex = databaseService.connection
  ) {
    return trx(this.tableName).insert(services.map(toSnake));
  }

  public async findByProfessionalId(professionalId: number) {
    return databaseService.connection
      .table(this.tableName)
      .select('name', 'starting_price', 'estimated_time')
      .where('professional_id', professionalId)
      .then((rows) => rows.map(toCamel));
  }
}

const serviceRepository = new ServiceRepository();

export default serviceRepository;
