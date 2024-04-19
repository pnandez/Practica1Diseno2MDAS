import { ReadModel } from 'social/domain/shared/readModel';
import { ChallengeStartedEvent } from '../event/ChallengeStarted.event';
import { ChallengesOfAHabbit } from './habbitChallenges';

export interface ChallengesPerHabbit extends ReadModel {
  of(habbitId: string): ChallengesOfAHabbit;

  apply(event: ChallengeStartedEvent): void;
}
