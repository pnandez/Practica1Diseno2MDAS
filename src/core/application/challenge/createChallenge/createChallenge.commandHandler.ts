import { Challenge } from '../../../domain/challenge/challenge';
import { ChallengeRepository } from '../../../domain/challenge/challenge.repository';
import { HabbitNotFoundError } from '../../../domain/habbit/error/habbitNotfFound.error';
import { HabbitRepository } from '../../../domain/habbit/habbit.repository';
import { CreateChallengeCommand } from './createChallenge.command';

export class CreateChallengeCommandHandler {
  constructor(
    private habbitRepository: HabbitRepository,
    private challengeRepository: ChallengeRepository,
  ) {}

  handle(command: CreateChallengeCommand) {
    if (!this.habbitRepository.exists(command.habbitId)) {
      throw HabbitNotFoundError.withHabbitId(command.habbitId);
    }

    const challenge = Challenge.create(
      command.id,
      command.habbitId,
      command.description,
      command.timesToRepeatHabbit,
      command.startDate,
      command.limitDate,
    );

    this.challengeRepository.save(challenge);
  }
}
