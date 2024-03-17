import { BaseError } from '../../error/baseError';

export class ChallengeNotFoundError extends BaseError {
  private constructor(message: string) {
    super('challenge-not-found', message);
  }

  static withChallengeId(id: string) {
    return new ChallengeNotFoundError(`Challenge with id ${id} not found`);
  }
}
