import { BaseError } from '../../error/baseError';

export class IncompatibleStatusError extends BaseError {
  private constructor(message: string) {
    super('incompatible-status', message);
  }

  static withPreviousStatusAndChallengeId(
    status: string,
    challengeId: string,
  ): IncompatibleStatusError {
    return new IncompatibleStatusError(
      `Actual status: ${status} on challenge ${challengeId} does not allow to cancel the challenge`,
    );
  }
}
