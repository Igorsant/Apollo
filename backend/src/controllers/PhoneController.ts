import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import PhoneType from '../types/phone.type';

export default class PhoneController {
  public static async insertPhone(
    trx: Knex.Transaction,
    phone: PhoneType
  ): Promise<number> {
    return trx('phone')
      .insert(toSnake(phone))
      .returning('id')
      .then((res) => res[0]?.id);
  }

  public static async getPhoneById(id: number): Promise<{
    phone: string;
    isPhoneWhatasapp: boolean;
  }> {
    const [{ phone, is_phone_whatsapp }] = await databaseService.connection
      .table('phone')
      .select('phone', 'is_phone_whatsapp')
      .where('id', id);

    return { phone, isPhoneWhatasapp: is_phone_whatsapp };
  }

  public static async getPhonesByIds(ids: number[]) {
    return databaseService.connection
      .table('phone')
      .select('phone', 'is_phone_whatsapp')
      .whereIn('id', ids)
      .then((rows) => rows.map(toCamel));
  }
}
