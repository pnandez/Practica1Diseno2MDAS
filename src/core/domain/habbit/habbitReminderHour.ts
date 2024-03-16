import { InconsistenHabbitDataError } from './error/inconsistentHabbitData.error';

export class HabbitReminderHour {
  private constructor(readonly hour: number) {}

  static create(hour: number): HabbitReminderHour {
    if (hour > 23) {
      throw InconsistenHabbitDataError.withHabbitReminderHour(hour);
    }

    return new HabbitReminderHour(hour);
  }
}
