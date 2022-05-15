import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import SchedulingType from '../types/scheduling.type';

class SchedulingRepository {
  private tableName = 'scheduling';

  public async createScheduling(scheduling: SchedulingType) {
    return databaseService.connection
      .table(this.tableName)
      .insert(scheduling)
      .returning('id');
  }


  // public async insertAll(
  //   schedulings: SchedulingType[],
  //   trx: Knex = databaseService.connection
  // ) {
  //   if (schedulings.length === 0) return;
  //   return trx(this.tableName).insert(schedulings.map(toSnake));
  // }

  // public async findByProfessionalId(professionalId: number) {
  //   return databaseService.connection
  //     .table(this.tableName)
  //     .select('id', 'name', 'starting_price', 'estimated_time')
  //     .where('professional_id', professionalId)
  // .then((rows) => rows.map(toCamel));
  // }
}

const schedulingRepository = new SchedulingRepository();

export default schedulingRepository;
