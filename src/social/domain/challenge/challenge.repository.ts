import { Challenge } from './Challenge.eventSourcedEntity';

export interface ChallengeRepository {
  findAllByHabbitId(habbitId: string): Challenge[];
  findByIdOrException(id: string): Challenge;
}
