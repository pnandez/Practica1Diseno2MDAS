import { Challenge } from './challenge';

export interface ChallengeRepository {
  save(challenge: Challenge);

  update(challenge: Challenge);

  findAllByHabbitId(habbitId: string): Challenge[];

  findByIdOrException(id: string): Challenge;
}
