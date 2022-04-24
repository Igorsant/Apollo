import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import WorkHourType from '../types/workHour.type';

export default class WorkHourController {
  public static async insertWorkHours(
    trx: Knex.Transaction,
    workHours: WorkHourType[]
  ) {
    return trx('workhour').insert(workHours.map(toSnake));
  }

  public static async getWorkHoursByProfessionalId(professionalId: number) {
    return databaseService.connection
      .table('workhour')
      .select('weekday', 'start_time', 'end_time', 'break_time')
      .where('professional_id', professionalId)
      .then((rows) => rows.map(toCamel));
  }
}
