import { EventPublisher } from 'core/application/shared/eventPublisher';
import { AddProgressToChallengeCommand } from './addProgressToChallenge.command';
import { ChallengeRepository } from 'social/domain/challenge/challenge.repository';
import { ChallengesPerHabbit } from 'social/domain/challenge/readModels/challengesPerHabbit.readModel';

export class AddProgressToChallengeCommandHandler {
  constructor(
    private eventPublisher: EventPublisher,
    private challengeRepository: ChallengeRepository,
    private challengesPerAHabbit: ChallengesPerHabbit,
  ) {}

  handle(command: AddProgressToChallengeCommand) {
    const challengeIds = this.challengesPerAHabbit.of(command.habbitId);
    challengeIds.forEach((challengeId) => {
      const challenge =
        this.challengeRepository.findByIdOrException(challengeId);

      challenge.registerProgress(command.progress);
      this.eventPublisher.publishEvents(challenge.releaseEvents());
    });
  }
}
