import { BaseError } from '../../error/baseError';

export class InvalidHabbitDataError extends BaseError {
  private constructor(message: string) {
    super('invalid-habbit-data', message);
  }

  static withAttribute(attribute: string) {
    return new InvalidHabbitDataError(
      `Attribute with name: ${attribute} is required`,
    );
  }
}
