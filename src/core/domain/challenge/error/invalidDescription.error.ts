import { BaseError } from '../../error/baseError';

export class InvalidDescriptionError extends BaseError {
  private constructor(message: string) {
    super('description-too-long', message);
  }

  static withDescription(description: string) {
    return new InvalidDescriptionError(
      `Description exceeds maximum character length: ${description}`,
    );
  }
}
