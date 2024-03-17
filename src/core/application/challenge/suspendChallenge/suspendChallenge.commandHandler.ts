import { ChallengeRepository } from '../../../domain/challenge/challenge.repository';
import { SuspendChallengeCommand } from './suspendChallenge.command';

export class SuspendChallengeCommandHandler {
  constructor(private challengeRepository: ChallengeRepository) {}

  handle(command: SuspendChallengeCommand) {
    const challenges = this.challengeRepository.findAllByHabbitId(
      command.habbitId,
    );

    challenges.forEach((challenge) => challenge.habbitSuspended());
  }
}
