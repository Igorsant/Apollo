import databaseService from '../services/DatabaseService';

export default class ServicesController {
  public static async getServicesByProfessionalId(professionalId: number) {
    const services = await databaseService.connection
      .table('service')
      .select('name', 'price', 'estimated_duration')
      .where('professional_id', professionalId);

    for (const s of services) {
      s.estimatedDuration = s.estimated_duration;
      delete s.estimated_duration;
    }

    return services;
  }
}
