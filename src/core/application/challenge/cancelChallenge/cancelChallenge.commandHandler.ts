import { ChallengeRepository } from '../../../domain/challenge/challenge.repository';
import { CancelChallengeCommand } from './cancelChallenge.command';

export class CancelChallengeCommandHandler {
  constructor(private challengeRepository: ChallengeRepository) {}

  handle(command: CancelChallengeCommand) {
    const challenge = this.challengeRepository.findByIdOrException(
      command.challengeId,
    );

    challenge.cancel();

    this.challengeRepository.update(challenge);
  }
}
