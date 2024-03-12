import { BaseError } from '../../error/baseError';

export class InvalidLimitDate extends BaseError {
  constructor(message: string) {
    super('invalid-limit-date', message);
  }

  static withLimitDateEqualOrLessThanStartDate(
    startDate: Date,
    limitDate: Date,
  ): InvalidLimitDate {
    return new InvalidLimitDate(
      `Limit date '${limitDate}' must be after start date '${startDate}'`,
    );
  }
}
