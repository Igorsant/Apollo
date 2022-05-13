import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import phoneRepository from './phone.repository';
import WorkplaceType from '../types/workplace.type';
import PhoneType from '../types/phone.type';

class WorkplaceRepository {
  private tableName = 'workplace';

  public getTableName(): string {
    return this.tableName;
  }

  public async insert(
    workplace: WorkplaceType,
    trx: Knex = databaseService.connection
  ): Promise<number> {
    return trx(this.tableName)
      .insert(toSnake(workplace))
      .returning('id')
      .then((res) => res[0]?.id);
  }

  public async findById(id: number) {
    const workplace: any = await databaseService.connection
      .table(this.tableName)
      .select(
        'phone1_id',
        'phone2_id',
        'street',
        'street_number',
        'complement',
        'city'
      )
      .where('id', id)
      .then((rows) => (rows[0] ? toCamel(rows[0]) : null));

    workplace.phones = await phoneRepository.findByIds([
      workplace.phone1Id,
      workplace.phone2Id
    ]);

    delete workplace.phone1Id;
    delete workplace.phone2Id;

    return workplace;
  }

  public async update(
    id: number,
    workplace: WorkplaceType,
    trx: Knex = databaseService.connection
  ) {
    const oldWorkplace: any = await trx(this.tableName)
      .select('phone1_id', 'phone2_id')
      .where('id', id)
      .first()
      .then(toCamel);

    const { phone1Id, phone2Id } = oldWorkplace;

    await phoneRepository.update(phone1Id, workplace.phones[0], trx);

    if (phone2Id && workplace.phones.length < 2)
      await phoneRepository.delete(phone2Id);

    if (!phone2Id && workplace.phones.length > 1) {
      const insertedId = await phoneRepository.insert(workplace.phones[1], trx);
      workplace.phone2Id = insertedId;
    }

    if (phone2Id && workplace.phones.length > 1)
      await phoneRepository.update(phone2Id, workplace.phones[1], trx);

    delete workplace.phones;

    return trx(this.tableName).update(toSnake(workplace)).where('id', id);
  }
}

const workplaceRepository = new WorkplaceRepository();

export default workplaceRepository;
