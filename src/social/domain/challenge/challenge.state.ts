import { ChallengeCost } from './challengeCost';
import { ChallengeStatus } from './challengeStatus';
import { ChallengeStartedEvent } from './event/ChallengeStarted.event';

export class ChallengeState {
  private readonly joinedUsers: string[] = [];

  private constructor(
    private readonly id: string,
    private readonly habbitId: string,
    private readonly target: number,
    private readonly partner: string,
    private readonly project: string,
    private readonly cost: ChallengeCost,
    private readonly deadline: Date,
    private readonly ownerUserId: string,
    private readonly status: ChallengeStatus,
  ) {
    this.joinedUsers.push(ownerUserId);
  }

  static createEmpty() {
    return new ChallengeState(
      '',
      '',
      0,
      '',
      '',
      ChallengeCost.create(0),
      new Date(),
      '',
      ChallengeStatus.zero(),
    );
  }

  whenChallengeCreated(event: ChallengeStartedEvent) {
    return new ChallengeState(
      event.payload.challengeId,
      event.payload.habbitId,
      event.payload.target,
      event.payload.partner,
      event.payload.project,
      ChallengeCost.create(event.payload.cost),
      event.payload.deadline,
      event.payload.ownerUserId,
      ChallengeStatus.started(),
    );
  }

  isFinished(): boolean {
    return this.status.isFinished();
  }
}
