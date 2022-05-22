import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import SchedulingType from '../types/scheduling.type';
import { userPicture } from '../helpers/image.helper';
import professionalRepository from './professional.repository';
import serviceRepository from './service.repository';
import customerRepository from './customer.repository';

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

    const todayString = new Date().toISOString().split('T')[0];

    const schedulings = await databaseService.connection
      .table(this.tableName)
      .select(
        'id',
        'professional_id',
        'customer_id',
        'start_time',
        'end_time',
        'total_price',
        'confirmed'
      )
      .where('confirmed', confirmed)
      .andWhere(userField, userId)
      .andWhere('start_time', '>', todayString)
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

      scheduling.professional = professional;

      const customer = await customerRepository.findById(
        scheduling.customerId,
        ['nickname', 'picture_name']
      );

      customer.picturePath = userPicture(customer.pictureName);
      delete customer.pictureName;

      scheduling.customer = customer;

      delete scheduling.customerId;
      delete scheduling.professionalId;

      scheduling.services = await serviceRepository.findByIds(servicesIds);
    }

    return schedulings;
  }

  public async findById(
    id: number,
    userId: number,
    userType: 'CUSTOMER' | 'PROFESSIONAL',
    confirmed: boolean = null
  ) {
    const userField =
      userType === 'CUSTOMER' ? 'customer_id' : 'professional_id';

    const todayString = new Date().toISOString().split('T')[0];

    const scheduling = await databaseService.connection
      .table(this.tableName)
      .select(
        'id',
        'professional_id',
        'customer_id',
        'start_time',
        'end_time',
        'total_price',
        'confirmed'
      )
      .where('id', id)
      .andWhere(userField, userId)
      .andWhere('start_time', '>', todayString)
      .modify((queryBuilder) => {
        if (confirmed !== null) queryBuilder.where('confirmed', confirmed);
      })
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

    scheduling.professional = professional;

    const customer = await customerRepository.findById(scheduling.customerId, [
      'nickname',
      'picture_name'
    ]);

    customer.picturePath = userPicture(customer.pictureName);
    delete customer.pictureName;

    scheduling.customer = customer;

    delete scheduling.customerId;
    delete scheduling.professionalId;

    scheduling.services = await serviceRepository.findByIds(servicesIds);

    return scheduling;
  }

  public async confirmById(schedulingId: string) {
    return databaseService.connection
      .table(this.tableName)
      .update('confirmed', true)
      .where('id', schedulingId);
  }
}

const schedulingRepository = new SchedulingRepository();

export default schedulingRepository;
