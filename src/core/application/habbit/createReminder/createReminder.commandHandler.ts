import { HabbitRepository } from '../../../domain/habbit/habbit.repository';
import { CreateReminderCommand } from './createReminder.command';

export class CreateReminderCommandHandler {
  constructor(private habbitRepository: HabbitRepository) {}

  handle(command: CreateReminderCommand) {
    const habbit = this.habbitRepository.findByIdOrException(command.habbitId);

    habbit.addReminder(
      command.id,
      command.message,
      command.isActive,
      command.hourToNotify,
    );

    this.habbitRepository.save(habbit);
  }
}
