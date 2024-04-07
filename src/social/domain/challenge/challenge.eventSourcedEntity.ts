import { BaseEvent } from '../shared/baseEvent';
import { EventSourcedEntity } from '../shared/eventSourcedEntity';
import { Payload } from '../shared/payload';
import { ChallengeState } from './challenge.state';
import { ChallengeStartedEvent } from './event/ChallengeStarted.event';

export class Challenge extends EventSourcedEntity {
  private state: ChallengeState = ChallengeState.createEmpty();

  constructor(stream?: Array<BaseEvent<Payload>>) {
    super(stream);
  }

  protected when(event: BaseEvent<Payload>): void {
    switch (event.type) {
      case ChallengeStartedEvent.Type:
        this.state = this.state.whenChallengeCreated(
          event as ChallengeStartedEvent,
        );
        break;
    }
  }

  static createStarted(
    id: string,
    habbitId: string,
    target: number,
    partner: string,
    project: string,
    cost: number,
    deadline: Date,
    ownerUserId: string,
  ) {
    const challenge = new Challenge();

    challenge.start(
      id,
      habbitId,
      target,
      partner,
      project,
      cost,
      deadline,
      ownerUserId,
    );
    return challenge;
  }

  start(
    id: string,
    habbitId: string,
    target: number,
    partner: string,
    project: string,
    cost: number,
    deadline: Date,
    ownerUserId: string,
  ) {
    if (this.isFinished()) {
      return;
    }

    this.apply(
      ChallengeStartedEvent.with(
        id,
        habbitId,
        target,
        partner,
        project,
        cost,
        deadline,
        ownerUserId,
      ),
    );
  }

  isFinished(): boolean {
    return this.state?.isFinished();
  }
}
