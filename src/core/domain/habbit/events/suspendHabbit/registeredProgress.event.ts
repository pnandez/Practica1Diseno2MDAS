import { BaseEvent } from '../../../shared/baseEvent';
import { RegisteredProgressPayload } from './registeredProgress.eventPayload';

export class RegisteredProgressEvent extends BaseEvent<RegisteredProgressPayload> {
  private constructor(
    readonly aggregateRootId: string,
    readonly payload: RegisteredProgressPayload,
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
    progressDate: number,
    habbitId: string,
  ) {
    return new RegisteredProgressEvent(
      aggregateRootId,
      new RegisteredProgressPayload(habbitId, progressDate),
    );
  }
}
