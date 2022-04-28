import { toCamel, toSnake } from 'snake-camel';

import CustomerType from '../types/customer.type';
import databaseService from '../services/DatabaseService';
import phoneRepository from './phone.repository';

class CustomerRepository {
  private tableName = 'customer';

  public async findById(id: number): Promise<any> {
    return databaseService.connection
      .table(this.tableName)
      .select('full_name', 'picture_name')
      .where('id', id)
      .first()
      .then(toCamel);
  }

  public async findByEmail(email: string): Promise<any> {
    return databaseService.connection
      .table(this.tableName)
      .where('email', email)
      .first()
      .then(toCamel);
  }

  public async insert(customer: CustomerType) {
    const localCustomer: CustomerType = JSON.parse(JSON.stringify(customer));

    return databaseService.connection.transaction(async (trx) => {
      localCustomer.phoneId = await phoneRepository.insert(
        {
          phone: localCustomer.phone
        },
        trx
      );

      delete localCustomer.phone;

      await trx(this.tableName).insert(toSnake(localCustomer));

      return trx.commit();
    });
  }
}

const customerRepository = new CustomerRepository();

export default customerRepository;
