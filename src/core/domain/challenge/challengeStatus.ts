export class ChallengeStatus {
  private constructor(readonly status: string) {}

  static pending(): ChallengeStatus {
    return new ChallengeStatus(Status.Pending);
  }

  static completed(): ChallengeStatus {
    return new ChallengeStatus(Status.Completed);
  }

  static suspended(): ChallengeStatus {
    return new ChallengeStatus(Status.Suspended);
  }

  static expired(): ChallengeStatus {
    return new ChallengeStatus(Status.Expired);
  }

  isPending(): boolean {
    return this.status === Status.Pending;
  }
}

const Status = {
  Pending: 'pending',
  Completed: 'completed',
  Suspended: 'suspended',
  Expired: 'expired',
};
