import { Challenge } from '../../../domain/challenge/challenge';
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository';

export class ChallengeInMemoryRepository implements ChallengeRepository {
  challenges: Challenge[] = [];

  save(challenge: Challenge) {
    this.challenges.push(challenge);
  }

  update(challenge: Challenge) {
    const index = this.challenges.findIndex((c) => c.id === challenge.id);
    if (index === -1) {
      return;
    }
    this.challenges[index] = challenge;
  }

  findAllByHabbitId(habbitId: string): Challenge[] {
    return this.challenges.filter((c) => c.habbitId === habbitId);
  }
}
