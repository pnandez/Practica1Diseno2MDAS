import { HabbitReminderHour } from './habbitReminderHour';

export class HabbitReminder {
  private constructor(
    readonly id: string,
    readonly message: string,
    readonly isActive: boolean,
    readonly hourToNotify: HabbitReminderHour,
  ) {}

  public static create(
    id: string,
    message: string,
    isActive: boolean,
    hourToNotify: number,
  ) {
    return new HabbitReminder(
      id,
      message,
      isActive,
      HabbitReminderHour.create(hourToNotify),
    );
  }
}
