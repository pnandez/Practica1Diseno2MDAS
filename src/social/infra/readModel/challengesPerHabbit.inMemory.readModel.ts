import { ChallengeStartedEvent } from 'social/domain/challenge/event/ChallengeStarted.event';
import { ChallengesPerHabbit } from 'social/domain/challenge/readModels/challengesPerHabbit.readModel';
import { ChallengesOfAHabbit } from 'social/domain/challenge/readModels/habbitChallenges';

export class ChallengesPerHabbitInMemoryReadModel
  implements ChallengesPerHabbit
{
  readonly data: ChallengesOfAHabbit[] = [];

  of(habbitId: string): string[] {
    return this.data.find((challenges) => challenges.habbitId === habbitId)
      .challengeIds;
  }
  apply(event: ChallengeStartedEvent): void {
    const challengesPerHabbit = this.data.find(
      (challenges) => challenges.habbitId === event.payload.habbitId,
    );

    if (!challengesPerHabbit) {
      this.data.push({
        habbitId: event.payload.habbitId,
        challengeIds: [event.payload.challengeId],
      });

      return;
    }

    challengesPerHabbit.challengeIds.push(event.payload.challengeId);
  }
}
