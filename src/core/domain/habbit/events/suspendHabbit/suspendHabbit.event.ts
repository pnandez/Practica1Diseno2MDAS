import { BaseEvent } from '../../../shared/baseEvent';
import { SuspendHabbitPayload } from './suspendHabbit.eventPayload';

export class SuspendHabbitEvent extends BaseEvent<SuspendHabbitPayload> {
  private constructor(
    readonly aggregateRootId: string,
    readonly payload: SuspendHabbitPayload,
  ) {
    super(
      aggregateRootId,
      new Date().valueOf(),
      'registered-progress',
      payload,
    );
  }

  static create(aggregateRootId: string, habbitId: string) {
    return new SuspendHabbitEvent(
      aggregateRootId,
      new SuspendHabbitPayload(habbitId),
    );
  }
}
