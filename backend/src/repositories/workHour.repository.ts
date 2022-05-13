import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import WorkHourType from '../types/workHour.type';

class WorkHourRepository {
  private tableName = 'workhour';

  public async insertAll(
    workHours: WorkHourType[],
    trx: Knex = databaseService.connection
  ) {
    if (workHours.length === 0) return;
    return trx(this.tableName).insert(workHours.map(toSnake));
  }

  public async findByProfessionalId(professionalId: number) {
    return databaseService.connection
      .table(this.tableName)
      .select('id', 'weekday', 'start_time', 'end_time', 'break_time')
      .where('professional_id', professionalId)
      .then((rows) => rows.map(toCamel));
  }

  public async deleteAll(
    workHourIds: number[],
    trx: Knex = databaseService.connection
  ) {
    return trx(this.tableName).delete().whereIn('id', workHourIds);
  }

  public async updateAll(
    workHours: WorkHourType[],
    trx: Knex = databaseService.connection
  ) {
    const toUpdate = workHours.filter((w) => w.id);
    const toCreate = workHours.filter((w) => !w.id);

    if (toCreate.length > 0) await this.insertAll(toCreate, trx);

    const promises = [];
    for (const w of toUpdate) {
      promises.push(trx(this.tableName).update(toSnake(w)).where('id', w.id));
    }

    return Promise.all(promises);
  }
}

const workHourRepository = new WorkHourRepository();

export default workHourRepository;
