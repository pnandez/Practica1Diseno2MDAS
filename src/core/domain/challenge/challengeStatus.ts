export class ChallengeStatus {
  private constructor(readonly status: string) {}

  static fromString(status: string): ChallengeStatus {
    return new ChallengeStatus(Status[status.toUpperCase()]);
  }

  static pending(): ChallengeStatus {
    return new ChallengeStatus(Status.PENDING);
  }

  static completed(): ChallengeStatus {
    return new ChallengeStatus(Status.COMPLETED);
  }

  static cancelled(): ChallengeStatus {
    return new ChallengeStatus(Status.CANCELLED);
  }

  static suspended(): ChallengeStatus {
    return new ChallengeStatus(Status.SUSPENDED);
  }

  static expired(): ChallengeStatus {
    return new ChallengeStatus(Status.EXPIRED);
  }

  isPending(): boolean {
    return this.status === Status.PENDING;
  }

  isCompleted(): boolean {
    return this.status === Status.COMPLETED;
  }

  isCancelled(): boolean {
    return this.status === Status.CANCELLED;
  }
}

const Status = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  SUSPENDED: 'suspended',
  EXPIRED: 'expired',
};
