import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import ServiceType from '../types/service.type';

export default class ServiceController {
  public static async insertServices(
    trx: Knex.Transaction,
    services: ServiceType[]
  ) {
    return trx('service').insert(services.map(toSnake));
  }

  public static async getServicesByProfessionalId(professionalId: number) {
    return databaseService.connection
      .table('service')
      .select('name', 'starting_price', 'estimated_time')
      .where('professional_id', professionalId)
      .then((rows) => rows.map(toCamel));
  }
}
