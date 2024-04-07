import { Challenge } from './Challenge.eventSourcedEntity';

export interface ChallengeRepository {
  findByIdOrException(id: string): Challenge;
}
