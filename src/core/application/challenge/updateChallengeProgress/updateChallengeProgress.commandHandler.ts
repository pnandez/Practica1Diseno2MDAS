import { ChallengeRepository } from '../../../domain/challenge/challenge.repository';
import { UpdateChallengeProgressCommand } from './updateChallengeProgress.command';
import { EventPublisher } from '../../shared/eventPublisher';
import { HabbitRepository } from '../../../domain/habbit/habbit.repository';

export class UpdateChallengeProgressCommandHandler {
  constructor(
    private challengeRepository: ChallengeRepository,
    private habbitRepository: HabbitRepository,
    private eventPublisher?: EventPublisher,
  ) {}

  handle(command: UpdateChallengeProgressCommand) {
    const challenges = this.challengeRepository.findAllByHabbitId(
      command.habbitId,
    );
    const habbit = this.habbitRepository.findById(command.habbitId);

    challenges.forEach((challenge) => {
      challenge.newProgressRegistered(command.progressDate, habbit);
      this.challengeRepository.update(challenge);
      this.eventPublisher?.publishEvents(challenge.releaseEvents());
    });
  }
}
