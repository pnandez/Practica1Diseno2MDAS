import { Challenge } from '../../../domain/challenge/challenge';
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository';
import { ChallengeNotFoundError } from '../../../domain/challenge/error/challengeNotFound.error';

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

  findByIdOrException(id: string): Challenge {
    const challenge = this.challenges.find((c) => c.id === id);
    if (!challenge) {
      throw ChallengeNotFoundError.withChallengeId(id);
    }

    return challenge;
  }
}
