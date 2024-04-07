import { BaseError } from '../../error/baseError';

export class InvalidHabbitIdError extends BaseError {
  constructor(message: string) {
    super('invalid-habbit-id', message);
  }

  public static withHabbitId(habbitId: string): InvalidHabbitIdError {
    return new InvalidHabbitIdError(`Habbit with ${habbitId} does not exist.`);
  }
}
