import { HabbitNotFoundError } from '../../../domain/habbit/error/habbitNotfFound.error';
import { HabbitRepository } from '../../../domain/habbit/habbit.repository';
import { WearableService } from '../../../domain/wearable/wearable.service';
import { EventPublisher } from '../../shared/eventPublisher';
import { AddProgressCommand } from './addProgress.command';

export class AddProgressCommandHandler {
  constructor(
    private habbitReposiory: HabbitRepository,
    private wearableService?: WearableService,
    private eventPublisher?: EventPublisher,
  ) {}

  handle(command: AddProgressCommand): void {
    const habbit = this.habbitReposiory.findById(command.habbitId!);
    if (!habbit) {
      throw HabbitNotFoundError.withHabbitId(command.habbitId!);
    }
    habbit.recordProgress(
      command.date!,
      command.observations!,
      this.wearableService,
    );

    this.habbitReposiory.save(habbit);
    this.eventPublisher?.publishEvents(habbit.releaseEvents());
  }
}
