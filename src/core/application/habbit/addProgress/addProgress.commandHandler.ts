import { HabbitNotFoundError } from '../../../domain/habbit/error/habbitNotfFound.error';
import { HabbitRepository } from '../../../domain/habbit/habbit.repository';
import { WearableService } from '../../../domain/wearable/wearable.service';
import { AddProgressCommand } from './addProgress.command';

export class AddProgressCommandHandler {
  constructor(
    private habbitReposiory: HabbitRepository,
    private wearableService?: WearableService,
  ) {}

  handle(command: AddProgressCommand): void {
    const habbit = this.habbitReposiory.findById(command.habbitId);
    if (!habbit) {
      throw HabbitNotFoundError.withHabbitId(command.habbitId);
    }
    habbit.recordProgress(
      command.date,
      command.observations,
      this.wearableService,
    );

    this.habbitReposiory.save(habbit);
  }
}
