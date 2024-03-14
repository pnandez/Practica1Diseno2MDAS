import { ChallengeDescription } from './challengeDescription';
import { InvalidLimitDate } from './error/invalidLimitDate.error';

export class Challenge {
  constructor(
    readonly id: string,
    readonly habbitId: string,
    readonly description: ChallengeDescription,
    readonly numberOfTimesToRepeatHabbit: number,
    readonly startDate: Date,
    readonly limitDate: Date,
  ) {}

  static create(
    id: string,
    habbitId: string,
    description: string,
    numberOfTimesToRepeatHabbit: number,
    startDate: number,
    limitDate: number,
  ) {
    if (limitDate <= startDate) {
      throw InvalidLimitDate.withLimitDateEqualOrLessThanStartDate(
        new Date(startDate),
        new Date(limitDate),
      );
    }

    return new Challenge(
      id,
      habbitId,
      ChallengeDescription.create(description),
      numberOfTimesToRepeatHabbit,
      new Date(startDate),
      new Date(limitDate),
    );
  }
}
