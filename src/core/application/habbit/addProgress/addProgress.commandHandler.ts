import { HabbitNotFoundError } from '../../../domain/habbit/error/habbitNotfFound.Error';
import { HabbitRepository } from '../../../domain/habbit/habbit.repository';
import { AddProgressCommand } from './addProgress.command';

export class AddProgressCommandHandler {
  constructor(private habbitReposiory: HabbitRepository) {}

  handle(command: AddProgressCommand): void {
    const habbit = this.habbitReposiory.findById(command.habbitId);
    if (!habbit) {
      throw HabbitNotFoundError.withHabbitId(command.habbitId);
    }
    habbit.recordProgress(command.date, command.observations);

    this.habbitReposiory.save(habbit);
  }
}
