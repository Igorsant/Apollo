import databaseService from '../services/DatabaseService';

export default class WorkplaceController {
  public static async getWorkplaceById(id: number) {
    const [workplace] = await databaseService.connection
      .table('workplace')
      .select(
        'phone1_id',
        'phone2_id',
        'street',
        'street_number',
        'complement',
        'city'
      )
      .where('id', id);

    workplace.phones = await databaseService.connection
      .table('phone')
      .select('phone', 'is_phone_whatsapp')
      .whereIn('id', [workplace.phone1_id, workplace.phone2_id]);

    for (const p of workplace.phones) {
      p.isPhoneWhatsapp = p.is_phone_whatsapp;
      delete p.is_phone_whatsapp;
    }

    delete workplace.phone1_id;
    delete workplace.phone2_id;

    return workplace;
  }
}
