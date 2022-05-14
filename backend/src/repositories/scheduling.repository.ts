import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import SchedulingType from '../types/scheduling.type';

class SchedulingRepository {
  private tableName = 'scheduling';

  public async insertAll(
    schedulings: SchedulingType[],
    trx: Knex = databaseService.connection
  ) {
    if (schedulings.length === 0) return;
    return trx(this.tableName).insert(schedulings.map(toSnake));
  }

  public async findByProfessionalId(professionalId: number) {
    return databaseService.connection
      .table(this.tableName)
      .select('id', 'name', 'starting_price', 'estimated_time')
      .where('professional_id', professionalId)
      .then((rows) => rows.map(toCamel));
  }

  public async deleteAll(
    schedulingIds: number[],
    trx: Knex = databaseService.connection
  ) {
    return trx(this.tableName).delete().whereIn('id', schedulingIds);
  }

  public async updateAll(
    schedulings: SchedulingType[],
    trx: Knex = databaseService.connection
  ) {
    const toUpdate = schedulings.filter((s) => s.id);
    const toCreate = schedulings.filter((s) => !s.id);

    if (toCreate.length > 0) await this.insertAll(toCreate, trx);

    const promises = [];
    for (const s of toUpdate) {
      promises.push(trx(this.tableName).update(toSnake(s)).where('id', s.id));
    }

    return Promise.all(promises);
  }
}

const schedulingRepository = new SchedulingRepository();

export default schedulingRepository;
