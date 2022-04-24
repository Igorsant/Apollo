import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import PhoneController from './PhoneController';
import WorkplaceType from '../types/workplace.type';

export default class WorkplaceController {
  public static async insertWorkplace(
    trx: Knex.Transaction,
    workplace: WorkplaceType
  ): Promise<number> {
    return trx('workplace')
      .insert(toSnake(workplace))
      .returning('id')
      .then((res) => res[0]?.id);
  }

  public static async getWorkplaceById(id: number) {
    const workplace: any = await databaseService.connection
      .table('workplace')
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

    [workplace.phone1, workplace.phone2] = await PhoneController.getPhonesByIds(
      [workplace.phone1Id, workplace.phone2Id]
    );

    delete workplace.phone1Id;
    delete workplace.phone2Id;

    return workplace;
  }
}
