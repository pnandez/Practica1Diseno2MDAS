import { BaseError } from '../../error/baseError';

export class InconsistenHabbitDataError extends BaseError {
  private constructor(message: string) {
    super('inconsistent-habbit-data', message);
  }

  static withHabbitReminderHour(hour: number): InconsistenHabbitDataError {
    return new InconsistenHabbitDataError(
      `Reminder hour must be between 0 and 23. ${hour} is not valid`,
    );
  }
}
