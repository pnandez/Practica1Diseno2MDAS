import { Challenge } from '../../../domain/challenge/challenge';
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository';

export class ChallengeInMemoryRepository implements ChallengeRepository {
  challenges: Challenge[] = [];

  save(challenge: Challenge) {
    this.challenges.push(challenge);
  }
}
