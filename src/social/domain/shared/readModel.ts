import { BaseEvent } from './baseEvent';
import { Payload } from './payload';

export interface ReadModel {
  apply(event: BaseEvent<Payload>): void;
}
