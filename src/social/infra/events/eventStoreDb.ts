import { ChallengeRepository } from 'social/domain/challenge/challenge.repository';
import { EventPublisher } from '../../application/shared/eventPublisher';
import { BaseEvent } from '../../domain/shared/baseEvent';
import { Challenge } from 'social/domain/challenge/Challenge.eventSourcedEntity';
import { ChallengeNotFoundError } from 'social/domain/challenge/error/ChallengeNotFound.error';

export class EventStoreDb implements EventPublisher, ChallengeRepository {
  readonly events: BaseEvent<any>[] = [];

  publishEvents(events: BaseEvent<any>[]): void {
    events.forEach((event) => this.events.push(event));
  }

  hasPublishedEvent(eventType: string, aggregateId: string): boolean {
    console.log(this.events)
    return this.events.some(
      (e) => e.type === eventType && e.aggregateRootId === aggregateId,
    );
  }
  findByIdOrException(id: string): Challenge {
    const challengeEvents = this.events.filter((e) => e.aggregateRootId === id);

    if (challengeEvents.length === 0) {
      throw ChallengeNotFoundError.withChallengeId(id);
    }

    return new Challenge(challengeEvents);
  }
}
