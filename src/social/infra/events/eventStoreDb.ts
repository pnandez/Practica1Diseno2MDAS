import { EventPublisher } from '../../application/shared/eventPublisher';
import { BaseEvent } from '../../domain/shared/baseEvent';

export class EventStoreDb implements EventPublisher {
  readonly events: BaseEvent<any>[] = [];
  publishEvents(events: BaseEvent<any>[]): void {
    events.forEach((event) => this.events.push(event));
  }

  hasPublishedEvent(eventType: string, eventId: string): boolean {
    return this.events.some(
      (e) => e.type === eventType && e.aggregateRootId === eventId,
    );
  }
}
