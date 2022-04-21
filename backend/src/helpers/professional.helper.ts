import { Knex } from 'knex';

import { PhoneType } from '../types/phone.type';

export const insertPhone = (
  trx: Knex.Transaction<any, any[]>,
  { phone, is_phone_whatsapp }: PhoneType
) => {
  return trx('phone').insert({ phone, is_phone_whatsapp });
};
