import { ChallengeDescription } from './challengeDescription';
import { ChallengeStatus } from './challengeStatus';
import { IncompatibleStatusError } from './error/incompatibleStatus.error';
import { InvalidLimitDate } from './error/invalidLimitDate.error';
import { ProgressOutsideDateLimits } from './error/progressOutsideLimits.error';

export class Challenge {
  private remainingTimesToRepeatHabbit: number = 0;
  private status: ChallengeStatus;

  private constructor(
    readonly id: string,
    readonly habbitId: string,
    readonly description: ChallengeDescription,
    readonly numberOfTimesToRepeatHabbit: number,
    readonly startDate: Date,
    readonly limitDate: Date,
    private readonly inputStatus?: string,
  ) {
    this.remainingTimesToRepeatHabbit = numberOfTimesToRepeatHabbit;
    this.status =
      ((inputStatus &&
        ChallengeStatus.fromString(inputStatus)) as ChallengeStatus) ??
      ChallengeStatus.pending();
  }

  get remainingTimesToComplete(): number {
    return this.remainingTimesToRepeatHabbit;
  }

  get currentStatus(): string {
    return this.status!.status;
  }

  static create(
    id: string,
    habbitId: string,
    description: string,
    numberOfTimesToRepeatHabbit: number,
    startDate: number,
    limitDate: number,
    status?: string,
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
      status,
    );
  }

  newProgressRegistered(date: number) {
    if (
      !this.status?.isPending() ||
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

  habbitSuspended() {
    if (this.status?.isPending()) {
      this.status = ChallengeStatus.suspended();
    }
  }

  cancel() {
    if (this.status?.isCompleted() || this.status?.isCancelled()) {
      throw IncompatibleStatusError.withPreviousStatusAndChallengeId(
        this.status?.status,
        this.id,
      );
    }

    this.status = ChallengeStatus.cancelled();
  }
}
