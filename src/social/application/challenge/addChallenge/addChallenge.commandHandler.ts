import { AddChallengeCommand } from './addChallenge.command';
import { InvalidUserIdError } from 'social/domain/challenge/error/InvalidParameters.error';
import { CoreQueryService } from 'social/domain/shared/core.service';
import { InvalidHabbitIdError } from 'social/domain/challenge/error/InvalidHabbitId.error';
import { EventPublisher } from 'social/application/shared/eventPublisher';
import { Challenge } from 'social/domain/challenge/challenge.eventSourcedEntity';

export class AddChallengeCommandHandler {
  constructor(
    private coreQueryService: CoreQueryService,
    private eventPublisher: EventPublisher,
  ) {}

  handle(command: AddChallengeCommand) {
    if (!this.coreQueryService.existsHabbit(command.habbitId)) {
      throw InvalidHabbitIdError.withHabbitId(command.habbitId);
    }
    if (!this.coreQueryService.existsUser(command.userId)) {
      throw InvalidUserIdError.withUserId(command.userId);
    }

    const challenge = Challenge.createStarted(
      command.challengeId,
      command.habbitId,
      command.target,
      command.partner,
      command.project,
      command.cost,
      command.deadline,
      command.userId,
    );

    this.eventPublisher.publishEvents(challenge.releaseEvents());
  }
}
