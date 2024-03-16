import { ChallengeDescription } from './challengeDescription';
import { ChallengeStatus } from './challengeStatus';
import { InvalidLimitDate } from './error/invalidLimitDate.error';
import { ProgressOutsideDateLimits } from './error/progressOutsideLimits.error';

export class Challenge {
  private remainingTimesToRepeatHabbit: number = 0;
  private status: ChallengeStatus;
  constructor(
    readonly id: string,
    readonly habbitId: string,
    readonly description: ChallengeDescription,
    readonly numberOfTimesToRepeatHabbit: number,
    readonly startDate: Date,
    readonly limitDate: Date,
  ) {
    this.remainingTimesToRepeatHabbit = numberOfTimesToRepeatHabbit;
    this.status = ChallengeStatus.pending();
  }

  get remainingTimesToComplete(): number {
    return this.remainingTimesToRepeatHabbit;
  }

  get currentStatus(): string {
    return this.status.status;
  }

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

  newProgressRegistered(date: number) {
    if (
      !this.status.isPending() ||
      date < this.startDate.valueOf() ||
      this.limitDate.valueOf() < date
    ) {
      throw ProgressOutsideDateLimits.withProgressDate(date);
    }

    if (this.remainingTimesToRepeatHabbit === 1) {
      this.status = ChallengeStatus.completed();
    }

    this.remainingTimesToRepeatHabbit -= 1;
  }
}
