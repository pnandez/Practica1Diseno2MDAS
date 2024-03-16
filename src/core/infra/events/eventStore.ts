import { EventPublisher } from '../../application/shared/eventPublisher';
import { BaseEvent } from '../../domain/shared/baseEvent';

export class EventStore implements EventPublisher {
  readonly events: BaseEvent<any>[] = [];
  publishEvents(events: BaseEvent<any>[]): void {
    events.forEach((event) => this.events.push(event));
  }
}
