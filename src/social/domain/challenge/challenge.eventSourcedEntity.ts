import { BaseEvent } from '../shared/baseEvent';
import { EventSourcedEntity } from '../shared/eventSourcedEntity';
import { Payload } from '../shared/payload';
import { ChallengeState } from './challenge.state';
import { ChallengeStartedEvent } from './event/ChallengeStarted.event';
import { UsersAddedEvent } from './event/UsersAdded.event';

export class Challenge extends EventSourcedEntity {
  private state: ChallengeState;

  constructor(stream?: Array<BaseEvent<Payload>>) {
    super(stream);
  }

  protected when(event: BaseEvent<Payload>): void {
    if (this.state === undefined) {
      this.state = ChallengeState.createEmpty();
    }
    switch (event.type) {
      case ChallengeStartedEvent.Type:
        this.state = this.state.whenChallengeCreated(
          event as ChallengeStartedEvent,
        );
        break;
      case UsersAddedEvent.Type:
        this.state = this.state.whenUsersAdded(event as UsersAddedEvent);
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

  addUsers(userIds: string[]) {
    console.log(this.state);
    this.apply(UsersAddedEvent.with(this.state.getId(), userIds));
  }

  isFinished(): boolean {
    return this.state?.isFinished();
  }
}
