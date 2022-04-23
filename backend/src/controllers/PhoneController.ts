import { Knex } from 'knex';

import databaseService from '../services/DatabaseService';

export default class PhoneController {
  public static async insertPhone(
    trx: Knex.Transaction,
    phone: string,
    isPhoneWhatsapp?: boolean
  ): Promise<number> {
    return trx('phone')
      .insert({ phone, is_phone_whatsapp: isPhoneWhatsapp })
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
}
