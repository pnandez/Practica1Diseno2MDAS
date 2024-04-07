import { EventPublisher } from 'social/application/shared/eventPublisher';
import { CoreQueryService } from 'social/domain/shared/core.service';
import { AddUsersToChallengeCommand } from './addUsersToChallenge.command';
import { InvalidUserIdError } from 'social/domain/challenge/error/InvalidParameters.error';
import { ChallengeRepository } from 'social/domain/challenge/challenge.repository';

export class AddUsersToChallengeCommandHandler {
  constructor(
    private coreQueryService: CoreQueryService,
    private eventPublisher: EventPublisher,
    private challengeRepository: ChallengeRepository,
  ) {}

  handle(command: AddUsersToChallengeCommand) {
    command.userIds.forEach((userId) => {
      if (!this.coreQueryService.existsUser(userId))
        throw InvalidUserIdError.withUserId(userId);
    });

    const challenge = this.challengeRepository.findByIdOrException(
      command.challengeId,
    );

    challenge.addUsers(command.userIds);
    this.eventPublisher.publishEvents(challenge.releaseEvents());
  }
}
