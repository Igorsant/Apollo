import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import { userPicture } from '../helpers/image.helper';
import phoneRepository from './phone.repository';
import serviceRepository from './service.repository';
import ServiceType from '../types/service.type';
import workHourRepository from './workHour.repository';
import WorkHourType from '../types/workHour.type';
import workplaceRepository from './workplace.repository';

class ProfessionalRepository {
  private tableName = 'professional';

  public constructor(private workplaceTableName: string) {}

  public async findIdsByCity(city: string, query?: string): Promise<number[]> {
    return databaseService.connection
      .select(`${this.tableName}.id`)
      .from(this.tableName)
      .join(
        this.workplaceTableName,
        `${this.tableName}.workplace_id`,
        `${this.workplaceTableName}.id`
      )
      .where(`${this.workplaceTableName}.city`, city)
      .modify((queryBuilder) => {
        if (query)
          queryBuilder.whereILike(`${this.tableName}.full_name`, `%${query}%`);
      })
      .then((rows) => rows.map((r: any) => r.id));
  }

  public async findByEmail(email: string): Promise<any> {
    return databaseService.connection
      .table(this.tableName)
      .where('email', email)
      .first()
      .then(toCamel);
  }

  public async findByIds(ids: number[]) {
    const professionals = await databaseService.connection
      .table(this.tableName)
      .select(
        'id',
        'about_me',
        'phone_id',
        'workplace_id',
        'full_name',
        'nickname',
        'picture_name'
      )
      .whereIn('id', ids)
      .then((rows) => rows.map(toCamel) as any[]);

    for (const p of professionals) {
      const phone = await phoneRepository.findById(p.phoneId);
      p.phone = phone.phone;

      p.picturePath = userPicture(p.pictureName);

      p.workplace = await workplaceRepository.findById(p.workplaceId);

      p.services = await serviceRepository.findByProfessionalId(p.id);
      p.workHours = await workHourRepository.findByProfessionalId(p.id);

      delete p.phoneId;
      delete p.pictureName;
      delete p.workplaceId;
    }

    return professionals;
  }

  public async insert(professional: any) {
    // copia o objeto professional para evitar mutar o objeto original
    const localProfessional = JSON.parse(JSON.stringify(professional));

    return databaseService.connection.transaction(async (trx) => {
      const { workplace, services, workHours } = localProfessional;

      workplace.phone1Id = await phoneRepository.insert(
        {
          phone: workplace.phone1,
          isPhoneWhatsapp: workplace.isPhone1Whatsapp
        },
        trx
      );

      delete workplace.phone1;
      delete workplace.isPhone1Whatsapp;

      if (workplace.phone2)
        workplace.phone2Id = await phoneRepository.insert(
          {
            phone: workplace.phone2,
            isPhoneWhatsapp: workplace.isPhone2Whatsapp
          },
          trx
        );

      delete workplace.phone2;
      delete workplace.isPhone2Whatsapp;

      localProfessional.workplaceId = await workplaceRepository.insert(
        workplace,
        trx
      );

      localProfessional.phoneId = await phoneRepository.insert(
        {
          phone: localProfessional.phone
        },
        trx
      );

      delete localProfessional.phone;
      delete localProfessional.workplace;
      delete localProfessional.services;
      delete localProfessional.workHours;

      const [{ id: professionalId }] = await trx(this.tableName)
        .insert(toSnake(localProfessional))
        .returning('id');

      services.every((s: ServiceType) => (s.professionalId = professionalId));
      await serviceRepository.insertAll(services, trx);

      workHours.every((w: WorkHourType) => (w.professionalId = professionalId));
      await workHourRepository.insertAll(workHours, trx);

      await trx.commit();
    });
  }

  public async exists(id: number): Promise<boolean> {
    return await databaseService.connection
      .table(this.tableName)
      .where('id', id)
      .then((rows) => rows.length > 0);
  }
}

const professionalRepository = new ProfessionalRepository(
  workplaceRepository.getTableName()
);

export default professionalRepository;
