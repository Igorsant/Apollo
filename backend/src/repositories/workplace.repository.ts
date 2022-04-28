import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import phoneRepository from './phone.repository';
import WorkplaceType from '../types/workplace.type';

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

    [workplace.phone1, workplace.phone2] = await phoneRepository.findByIds([
      workplace.phone1Id,
      workplace.phone2Id
    ]);

    delete workplace.phone1Id;
    delete workplace.phone2Id;

    return workplace;
  }
}

const workplaceRepository = new WorkplaceRepository();

export default workplaceRepository;
