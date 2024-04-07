import { BaseError } from '../../error/baseError';

export class InvalidUserIdError extends BaseError {
  constructor(message: string) {
    super('invalid-user-id', message);
  }

  static withUserId(userId: string): InvalidUserIdError {
    return new InvalidUserIdError(`Invalid userId: ${userId}`);
  }
}
