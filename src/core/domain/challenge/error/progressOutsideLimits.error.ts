import { BaseError } from '../../error/baseError';

export class ProgressOutsideDateLimits extends BaseError {
  private constructor(message: string) {
    super('progress-outside-date-limits', message);
  }

  static withProgressDate(date: number) {
    return new ProgressOutsideDateLimits(
      `Date: ${new Date(date).toISOString()} is before challenge start or after challenge limit date.`,
    );
  }
}
