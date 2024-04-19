import { ChallengeRepository } from 'social/domain/challenge/challenge.repository';
import { EventPublisher } from '../../application/shared/eventPublisher';
import { BaseEvent } from '../../domain/shared/baseEvent';
import { ReadModel } from 'social/domain/shared/readModel';
import { ChallengeNotFoundError } from 'social/domain/challenge/error/ChallengeNotFound.error';
import { Challenge } from 'social/domain/challenge/challenge.eventSourcedEntity';

export class EventStoreDb implements EventPublisher, ChallengeRepository {
  readonly events: BaseEvent<any>[] = [];
  readonly readModels: ReadModel[] = [];

  constructor(readModel?: ReadModel) {
    if (readModel) {
      this.readModels.push(readModel);
    }
  }

  publishEvents(events: BaseEvent<any>[]): void {
    events.forEach((event) => this.readModels.forEach((rm) => rm.apply(event)));
    this.events.push(...events);
  }

  hasPublishedEvent(eventType: string, aggregateId: string): boolean {
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
