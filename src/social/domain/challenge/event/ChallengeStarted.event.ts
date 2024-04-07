import { BaseEvent } from '../../shared/baseEvent';

export type ChallengeStartedEventPayload = {
  challengeId: string;
  habbitId: string;
  target: number;
  partner: string;
  project: string;
  cost: number;
  deadline: Date;
  ownerUserId: string;
};

export class ChallengeStartedEvent extends BaseEvent<ChallengeStartedEventPayload> {
  public static readonly Type = 'ChallengeStarted';

  private constructor(
    challengeId: string,
    payload: ChallengeStartedEventPayload,
  ) {
    super(challengeId, Date.now(), ChallengeStartedEvent.Type, payload);
  }

  static with(
    challengeId: string,
    habbitId: string,
    target: number,
    partner: string,
    project: string,
    cost: number,
    deadline: Date,
    ownerUserId: string,
  ) {
    return new ChallengeStartedEvent(challengeId, {
      challengeId,
      habbitId,
      target,
      partner,
      project,
      cost,
      deadline,
      ownerUserId,
    });
  }
}
