import { ChallengesPerHabbit } from 'social/domain/challenge/readModels/challengesPerHabbit.readModel';
import { GetChallengesForUserQuery } from './getChallengesForUser.query';

export class GetChallengesForUserQueryHandler {
  constructor(private challengesPerHabbit: ChallengesPerHabbit) {}

  handle(query: GetChallengesForUserQuery) {
    return this.challengesPerHabbit.of(query.userId);
  }
}
