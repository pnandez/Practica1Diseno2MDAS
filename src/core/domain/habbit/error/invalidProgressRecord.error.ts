import { BaseError } from '../../error/baseError';

export class InvalidProgressRecord extends BaseError {
  private constructor(message: string) {
    super('invalid-progress-record', message);
  }

  static withDateInFuture(date: string) {
    return new InvalidProgressRecord(
      `Date ${date} is in the future, you cannot add progress that hasn´t been made.`,
    );
  }

  static withIncompleteDataIntroduced(
    attribute: string,
  ): InvalidProgressRecord {
    return new InvalidProgressRecord(
      `${attribute} is not valid. Please provide a valid ${attribute}`,
    );
  }
}
