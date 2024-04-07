import { BaseEvent } from 'social/domain/shared/baseEvent';

export type UsersAddedEventPayload = {
  users: string[];
};

export class UsersAddedEvent extends BaseEvent<UsersAddedEventPayload> {
  public static readonly Type = 'UsersAdded';

  private constructor(challengeId: string, payload: UsersAddedEventPayload) {
    super(challengeId, Date.now(), UsersAddedEvent.Type, payload);
  }

  static with(challengeId: string, users: string[]) {
    return new UsersAddedEvent(challengeId, {
      users,
    });
  }
}
