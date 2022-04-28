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
    return trx(this.tableName).insert(workHours.map(toSnake));
  }

  public async findByProfessionalId(professionalId: number) {
    return databaseService.connection
      .table(this.tableName)
      .select('weekday', 'start_time', 'end_time', 'break_time')
      .where('professional_id', professionalId)
      .then((rows) => rows.map(toCamel));
  }
}

const workHourRepository = new WorkHourRepository();

export default workHourRepository;
