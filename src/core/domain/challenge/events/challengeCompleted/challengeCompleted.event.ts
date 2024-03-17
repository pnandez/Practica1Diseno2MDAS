import { BaseEvent } from '../../../shared/baseEvent';
import { ChallengeCompletedEventPayload } from './challengeCompleted.eventPayload';

export class ChallengeCompletedEvent extends BaseEvent<ChallengeCompletedEventPayload> {
  private constructor(
    readonly aggregateRootId: string,
    readonly payload: ChallengeCompletedEventPayload,
  ) {
    super(
      aggregateRootId,
      new Date().valueOf(),
      'registered-progress',
      payload,
    );
  }

  static create(
    aggregateRootId: string,
    challengeId: string,
    userId: string,
    date: number,
  ) {
    return new ChallengeCompletedEvent(
      aggregateRootId,
      new ChallengeCompletedEventPayload(challengeId, userId, date),
    );
  }
}
