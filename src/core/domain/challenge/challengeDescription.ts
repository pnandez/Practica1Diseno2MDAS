import { InvalidDescriptionError } from './error/invalidDescription.Error';

export class ChallengeDescription {
  constructor(readonly description: string) {}

  static create(description: string): ChallengeDescription {
    if (description.length > 30) {
      throw InvalidDescriptionError.withDescription(description);
    }

    return new ChallengeDescription(description);
  }
}
