import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import SchedulingType from '../types/scheduling.type';

class SchedulingRepository {
  private tableName = 'scheduling';
  private schedulingServiceTable = 'scheduling_service';

  public async createScheduling(
    scheduling: SchedulingType,
    trx: Knex = databaseService.connection
  ) {
    const schedulingIds = await trx
      .table(this.tableName)
      .insert(toSnake(scheduling))
      .returning('id');

    return schedulingIds[0].id;
  }

  public async insertSchedulingServices(
    schedulingId: number,
    services: number[],
    trx: Knex = databaseService.connection
  ) {
    const schedulingServices = services
      .map((service) => {
        return {
          schedulingId,
          serviceId: service
        };
      })
      .map(toSnake);

    return trx(this.schedulingServiceTable).insert(schedulingServices);
  }

  public async findById(
    schedulingId: number,
    trx: Knex = databaseService.connection
  ) {
    const scheduling = trx
      .table(this.tableName)
      .select('*')
      .where('id', schedulingId)
      .first()
      .then(toCamel);
    return scheduling;
  }

  public async removeById(
    schedulingId: number,
    trx: Knex = databaseService.connection
  ) {
    await trx
      .table(this.schedulingServiceTable)
      .where('scheduling_id', schedulingId)
      .delete();

    return trx.table(this.tableName).where('id', schedulingId).delete();
  }
}

const schedulingRepository = new SchedulingRepository();

export default schedulingRepository;
