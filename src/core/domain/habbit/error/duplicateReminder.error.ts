import { BaseError } from '../../error/baseError';

export class DuplicateReminderError extends BaseError {
  constructor(message: string) {
    super('duplicate-reminder', message);
  }

  static withHourAndHabbitName(hourToNotify: number, habbitName: string) {
    return new DuplicateReminderError(
      `There is already an existing reminder for habbit: ${habbitName} at ${hourToNotify}`,
    );
  }
}
