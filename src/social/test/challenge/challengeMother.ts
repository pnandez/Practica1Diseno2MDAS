import { ChallengeStartedEvent } from 'social/domain/challenge/event/ChallengeStarted.event';
import { BaseEvent } from 'social/domain/shared/baseEvent';
import { v4 } from 'uuid';

export class ChallengeMother {
  private id: string = v4();
  private habbitId: string = 'habbitId';
  private target: number = 10;
  private partner: string = 'partnerId';
  private project: string = 'projectId';
  private cost: number = 10;
  private deadline: Date = new Date(Date.now() + 1000);
  private ownerUserId: string = 'ownerUserId';

  private events: BaseEvent<any>[] = [];

  withId(id: string) {
    this.id = id;
    return this;
  }

  withTarget(target: number) {
    this.target = target;
    return this;
  }

  withHabbitId(habbitId: string) {
    this.habbitId = habbitId;
    return this;
  }

  withChallengeStarted() {
    this.events.push(
      ChallengeStartedEvent.with(
        this.id,
        this.habbitId,
        this.target,
        this.partner,
        this.project,
        this.cost,
        this.deadline,
        this.ownerUserId,
      ),
    );
    return this;
  }

  releaseEvents(): BaseEvent<any>[] {
    return this.events;
  }
}
