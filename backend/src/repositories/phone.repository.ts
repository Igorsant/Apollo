import { Knex } from 'knex';
import { toCamel, toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';
import PhoneType from '../types/phone.type';

class PhoneRepository {
  private tableName = 'phone';

  public async insert(
    phone: PhoneType,
    trx: Knex = databaseService.connection
  ): Promise<number> {
    return trx(this.tableName)
      .insert(toSnake(phone))
      .returning('id')
      .then((res) => res[0]?.id);
  }

  public async findById(id: number): Promise<{
    phone: string;
    isPhoneWhatasapp: boolean;
  }> {
    const [{ phone, is_phone_whatsapp }] = await databaseService.connection
      .table(this.tableName)
      .select('phone', 'is_phone_whatsapp')
      .where('id', id);

    return { phone, isPhoneWhatasapp: is_phone_whatsapp };
  }

  public async findByIds(ids: number[]) {
    return databaseService.connection
      .table(this.tableName)
      .select('phone', 'is_phone_whatsapp')
      .whereIn('id', ids)
      .then((rows) => rows.map(toCamel));
  }
}

const phoneRepository = new PhoneRepository();

export default phoneRepository;
