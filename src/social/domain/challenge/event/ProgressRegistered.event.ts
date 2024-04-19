import { BaseEvent } from 'social/domain/shared/baseEvent';

export type ProgressRegisteredEventPayload = {
  challengeId: string;
  progress: number;
};

export class ProgressRegisteredEvent extends BaseEvent<ProgressRegisteredEventPayload> {
  static readonly Type = 'ProgressRegistered';

  private constructor(
    challengeId: string,
    payload: ProgressRegisteredEventPayload,
  ) {
    super(challengeId, Date.now(), ProgressRegisteredEvent.Type, payload);
  }
  static with(challengeId: string, progress: number) {
    return new ProgressRegisteredEvent(challengeId, {
      challengeId,
      progress,
    });
  }
}
