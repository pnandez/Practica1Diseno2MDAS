import { BaseEvent } from './baseEvent';
import { Payload } from './payload';

export abstract class EventSourcedEntity {
  private appliedEvents: BaseEvent<Payload>[] = [];
  private version: number;

  protected constructor(stream?: Array<BaseEvent<Payload>>) {
    this.version = 0;
    if (stream) {
      stream.forEach((event) => this.when(event));
      this.version = stream.length;
    }
  }

  protected apply(e: BaseEvent<Payload>): void {
    this.appliedEvents.push(e);
    this.when(e);
  }

  protected abstract when(event: BaseEvent<Payload>): void;

  releaseEvents(): BaseEvent<any>[] {
    const events = this.appliedEvents;
    this.appliedEvents = [];
    return events;
  }
}
