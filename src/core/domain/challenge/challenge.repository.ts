import { Challenge } from './challenge';

export interface ChallengeRepository {
  save(challenge: Challenge);
}
