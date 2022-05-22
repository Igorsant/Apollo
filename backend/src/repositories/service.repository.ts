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
    if (services.length === 0) return;
    return trx(this.tableName).insert(services.map(toSnake));
  }

  public async findByProfessionalId(professionalId: number) {
    return databaseService.connection
      .table(this.tableName)
      .select('id', 'name', 'starting_price', 'estimated_time')
      .where('professional_id', professionalId)
      .then((rows) => rows.map(toCamel));
  }

  public async deleteAll(
    serviceIds: number[],
    trx: Knex = databaseService.connection
  ) {
    return trx(this.tableName).delete().whereIn('id', serviceIds);
  }

  public async updateAll(
    services: ServiceType[],
    trx: Knex = databaseService.connection
  ) {
    const toUpdate = services.filter((s) => s.id);
    const toCreate = services.filter((s) => !s.id);

    if (toCreate.length > 0) await this.insertAll(toCreate, trx);

    const promises = [];
    for (const s of toUpdate) {
      promises.push(trx(this.tableName).update(toSnake(s)).where('id', s.id));
    }

    return Promise.all(promises);
  }

  public async findByIds(ids: number[]): Promise<ServiceType[]> {
    return databaseService.connection
      .table(this.tableName)
      .select('name', 'starting_price', 'estimated_time')
      .whereIn('id', ids)
      .then((rows) => rows.map(toCamel) as ServiceType[]);
  }
}

const serviceRepository = new ServiceRepository();

export default serviceRepository;
