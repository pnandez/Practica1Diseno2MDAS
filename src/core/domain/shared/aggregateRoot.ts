import { BaseEvent } from './baseEvent';

export abstract class AggregateRoot {
  protected events: BaseEvent<any>[] = [];

  protected recordEvent(event: BaseEvent<any>): void {
    this.events.push(event);
  }

  public releaseEvents(): BaseEvent<any>[] {
    return this.events;
  }
}
