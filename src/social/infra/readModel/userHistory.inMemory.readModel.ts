import { BaseEvent } from '@core/domain/shared/baseEvent';
import { ChallengeStatus } from 'social/domain/challenge/challengeStatus';
import { ChallengeStartedEvent } from 'social/domain/challenge/event/ChallengeStarted.event';
import { ProgressRegisteredEvent } from 'social/domain/challenge/event/ProgressRegistered.event';
import { UsersAddedEvent } from 'social/domain/challenge/event/UsersAdded.event';
import { UserChallenge } from 'social/domain/userStory/readModels/userHistory';
import { UserHistoryReadModel } from 'social/domain/userStory/readModels/userHistory.readModel';

type UserChallengesByUser = {
  userId: string;
  challenges: UserChallenge[];
};

export class UserHistoryInMemoryReadModel implements UserHistoryReadModel {
  readonly data: UserChallengesByUser[] = [];

  of(userId: string): UserChallenge[] {
    return this.data.find((d) => d.userId === userId).challenges;
  }
  apply(event: BaseEvent<any>): void {
    switch (event.type) {
      case ChallengeStartedEvent.Type:
        this.newChallengeStarted(event);
        break;
      case ProgressRegisteredEvent.Type:
        this.newProgressRegistered(event);
        break;
      case UsersAddedEvent.Type:
        this.usersAdded(event);
        break;
    }
  }

  private newChallengeStarted(event: ChallengeStartedEvent) {
    const eventPayload = event.payload;
    const newEventUserId = eventPayload.ownerUserId;
    const newChallenge = {
      challengeId: eventPayload.challengeId,
      habbitId: eventPayload.habbitId,
      target: eventPayload.target,
      partner: eventPayload.partner,
      project: eventPayload.project,
      cost: eventPayload.cost,
      status: ChallengeStatus.started().toPrimitives(),
      progress: 0,
    };
    if (this.data.find((d) => d.userId === newEventUserId)) {
      this.data
        .find((d) => d.userId === newEventUserId)
        .challenges.push(newChallenge);
      return;
    }
    this.data.push({
      userId: newEventUserId,
      challenges: [newChallenge],
    });
  }

  private newProgressRegistered(event: ProgressRegisteredEvent) {
    const payload = event.payload;

    const challengeId = payload.challengeId;

    this.data.forEach(
      (d) =>
        (d.challenges = d.challenges.map((c) =>
          c.challengeId === challengeId
            ? { ...c, progress: c.progress + payload.progress }
            : c,
        )),
    );
  }

  private usersAdded(event: UsersAddedEvent) {
    const payload = event.payload;

    const challengeId = payload.challengeId;

    const challenge = this.data
      .find((d) => d.challenges.find((c) => c.challengeId === challengeId))
      .challenges.find((c) => c.challengeId === challengeId);

    payload.users.forEach((userId) => {
      const existingRecord = this.data.find((d) => d.userId === userId);
      if (!existingRecord) {
        this.data.push({ userId, challenges: [challenge] });
        return;
      }
      existingRecord.challenges.push(challenge);
    });
  }
}
