import { ChallengeRepository } from '../../../domain/challenge/challenge.repository';
import { UpdateChallengeProgressCommand } from './updateChallengeProgress.command';

export class UpdateChallengeProgressCommandHandler {
  constructor(private challengeRepository: ChallengeRepository) {}

  handle(command: UpdateChallengeProgressCommand) {
    const challenges = this.challengeRepository.findAllByHabbitId(
      command.habbitId,
    );

    console.log(challenges);
    challenges.forEach((challenge) => {
      challenge.newProgressRegistered(command.progressDate);
      this.challengeRepository.update(challenge);
    });
  }
}
