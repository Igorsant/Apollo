import databaseService from '../services/DatabaseService';

export default class WorkHoursController {
  public static async getProfessionalWorkHours(professionalId: number) {
    const workHours = await databaseService.connection
      .table('workday')
      .select('week_day', 'start_time', 'end_time', 'break_time')
      .where('professional_id', professionalId);

    for (const w of workHours) {
      w.weekDay = w.week_day;
      w.startTime = w.start_time;
      w.endTime = w.end_time;
      w.breakTime = w.break_time;

      delete w.week_day;
      delete w.start_time;
      delete w.end_time;
      delete w.break_time;
    }

    return workHours;
  }
}
