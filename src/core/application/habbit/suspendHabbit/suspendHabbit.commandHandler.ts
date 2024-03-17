import { HabbitRepository } from '../../../domain/habbit/habbit.repository';
import { EventPublisher } from '../../shared/eventPublisher';
import { SuspendHabbitCommand } from './suspendHabbit.command';

export class SuspendHabbitCommandHandler {
  constructor(
    private habbitRepository: HabbitRepository,
    private eventPublisher?: EventPublisher,
  ) {}

  handle(command: SuspendHabbitCommand) {
    const habbit = this.habbitRepository.findByIdOrException(command.habbitId);

    habbit.suspend();

    this.habbitRepository.save(habbit);

    this.eventPublisher?.publishEvents(habbit.releaseEvents());
  }
}
