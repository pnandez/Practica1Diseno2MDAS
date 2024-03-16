import { BaseEvent } from '../../domain/shared/baseEvent';

export interface EventPublisher {
  publishEvents(event: BaseEvent<any>[]): void;
}
