import { ChallengeCost } from './challengeCost';
import { ChallengeStatus } from './challengeStatus';
import { ChallengeStartedEvent } from './event/ChallengeStarted.event';
import { ProgressRegisteredEvent } from './event/ProgressRegistered.event';
import { UsersAddedEvent } from './event/UsersAdded.event';

export class ChallengeState {
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
    private readonly joinedUsers: string[] = [ownerUserId],
    private readonly progress: number = 0,
  ) {}

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

  whenUsersAdded(event: UsersAddedEvent) {
    return new ChallengeState(
      this.id,
      this.habbitId,
      this.target,
      this.partner,
      this.project,
      this.cost,
      this.deadline,
      this.ownerUserId,
      ChallengeStatus.started(),
      event.payload.users,
    );
  }

  whenProgressRegistered(event: ProgressRegisteredEvent) {
    const isTargetReached =
      this.progress + event.payload.progress >= this.target;
    if (isTargetReached && this.status.isStarted()) {
      return new ChallengeState(
        this.id,
        this.habbitId,
        this.target,
        this.partner,
        this.project,
        this.cost,
        this.deadline,
        this.ownerUserId,
        ChallengeStatus.achieved(),
        this.joinedUsers,
        this.progress + event.payload.progress,
      );
    }
    return new ChallengeState(
      this.id,
      this.habbitId,
      this.target,
      this.partner,
      this.project,
      this.cost,
      this.deadline,
      this.ownerUserId,
      this.status,
      this.joinedUsers,
      this.progress + event.payload.progress,
    );
  }

  isFinished(): boolean {
    return this.status.isFinished();
  }

  getId() {
    return this.id;
  }

  getRemainingProgress(): number {
    if (this.isFinished()) {
      return 0;
    }
    return this.target - this.progress;
  }
}
