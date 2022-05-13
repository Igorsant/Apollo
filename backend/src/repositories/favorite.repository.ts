import { toSnake } from 'snake-camel';

import databaseService from '../services/DatabaseService';

class FavoriteRepository {
  private tableName = 'favorite';

  public async insert(customerId: number, professionalId: number) {
    const favorite = { customerId, professionalId };

    return databaseService.connection
      .table(this.tableName)
      .insert(toSnake(favorite));
  }

  public async exists(customerId: number, professionalId: number) {
    return databaseService.connection
      .table(this.tableName)
      .select('*')
      .where('customer_id', customerId)
      .andWhere('professional_id', professionalId)
      .then((rows) => rows.length > 0);
  }

  public async delete(customerId: number, professionalId: number) {
    return databaseService.connection
      .table(this.tableName)
      .delete()
      .where('customer_id', customerId)
      .andWhere('professional_id', professionalId);
  }

  public async getProfessionalIds(customerId: number) {
    return databaseService.connection
      .table(this.tableName)
      .select('professional_id')
      .where('customer_id', customerId)
      .then((rows) => rows.map((r) => r.professional_id));
  }
}

const favoriteRepository = new FavoriteRepository();

export default favoriteRepository;
