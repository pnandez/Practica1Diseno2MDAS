export class ChallengeStatus {
  private static readonly zeroStatus = 'PENDING';
  private static readonly startedStatus = 'STARTED';
  private static readonly achievedStatus = 'ACHIEVED';
  private static readonly failedStatus = 'FAILED';

  private constructor(private readonly status: string) {}

  static zero(): ChallengeStatus {
    return new ChallengeStatus(this.zeroStatus);
  }
  public static started(): ChallengeStatus {
    return new ChallengeStatus(this.startedStatus);
  }

  public static achieved(): ChallengeStatus {
    return new ChallengeStatus(this.achievedStatus);
  }

  public static failed(): ChallengeStatus {
    return new ChallengeStatus(this.failedStatus);
  }

  isFinished(): boolean {
    return (
      this.status === ChallengeStatus.achievedStatus ||
      this.status === ChallengeStatus.failedStatus
    );
  }
}
