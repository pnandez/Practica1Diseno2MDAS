import { BaseError } from '../../error/baseError';

export class ChallengeNotFoundError extends BaseError {
  constructor(message: string) {
    super('challenge-not-found', message);
  }

  public static withChallengeId(challengeId: string): ChallengeNotFoundError {
    return new ChallengeNotFoundError(
      `Challenge with id ${challengeId} not found`,
    );
  }
}
