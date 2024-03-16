import { BaseError } from '../../error/baseError';

export class MaximumHabbitRemindersReachedError extends BaseError {
  private constructor(message: string) {
    super('maximum-habbit-reminders-reached', message);
  }

  static withHabbitName(habbitName: string) {
    return new MaximumHabbitRemindersReachedError(
      `Maximum habbit reminders reached for habbit: ${habbitName}. Please delete one of them and try again.`,
    );
  }
}
