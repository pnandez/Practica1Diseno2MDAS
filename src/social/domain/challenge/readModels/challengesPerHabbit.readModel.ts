import { ReadModel } from 'social/domain/shared/readModel';
import { ChallengeStartedEvent } from '../event/ChallengeStarted.event';

export interface ChallengesPerHabbit extends ReadModel {
  of(habbitId: string): string[];

  apply(event: ChallengeStartedEvent): void;
}
