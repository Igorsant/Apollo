import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import SchedulingType from '../types/scheduling.type';
import { userPicture } from '../helpers/image.helper';
import professionalRepository from './professional.repository';
import serviceRepository from './service.repository';

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

  public async findAll(
    userId: number,
    userType: 'CUSTOMER' | 'PROFESSIONAL',
    confirmed: boolean
  ) {
    const userField =
      userType === 'CUSTOMER' ? 'customer_id' : 'professional_id';

    const schedulings = await databaseService.connection
      .table(this.tableName)
      .select(
        'id',
        'professional_id',
        'start_time',
        'end_time',
        'total_price',
        'confirmed'
      )
      .where('confirmed', confirmed)
      .andWhere(userField, userId)
      .then((rows) => rows.map(toCamel) as SchedulingType[]);

    for (const scheduling of schedulings) {
      const servicesIds = await databaseService.connection
        .table(this.schedulingServiceTable)
        .select('service_id')
        .where('scheduling_id', scheduling.id)
        .then((rows) => rows.map((r) => r.service_id));

      const professional = await professionalRepository.findById(
        scheduling.professionalId,
        ['id', 'nickname', 'picture_name']
      );

      professional.picturePath = userPicture(professional.pictureName);
      delete professional.pictureName;
      delete scheduling.professionalId;

      scheduling.professional = professional;

      scheduling.services = await serviceRepository.findByIds(servicesIds);
    }

    return schedulings;
  }

  public async findById(
    id: number,
    userId: number,
    userType: 'CUSTOMER' | 'PROFESSIONAL'
  ) {
    const userField =
      userType === 'CUSTOMER' ? 'customer_id' : 'professional_id';

    const scheduling = await databaseService.connection
      .table(this.tableName)
      .select(
        'id',
        'professional_id',
        'start_time',
        'end_time',
        'total_price',
        'confirmed'
      )
      .where('id', id)
      .andWhere(userField, userId)
      .first()
      .then((row) => toCamel(row) as SchedulingType);

    if (!scheduling) return null;

    const servicesIds = await databaseService.connection
      .table(this.schedulingServiceTable)
      .select('service_id')
      .where('scheduling_id', scheduling.id)
      .then((rows) => rows.map((r) => r.service_id));

    const professional = await professionalRepository.findById(
      scheduling.professionalId,
      ['id', 'nickname', 'picture_name']
    );

    professional.picturePath = userPicture(professional.pictureName);
    delete professional.pictureName;
    delete scheduling.professionalId;

    scheduling.professional = professional;

    scheduling.services = await serviceRepository.findByIds(servicesIds);

    return scheduling;
  }
}

const schedulingRepository = new SchedulingRepository();

export default schedulingRepository;
