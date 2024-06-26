import { Habbit } from '../../../domain/habbit/habbit';
import { HabbitRepository } from '../../../domain/habbit/habbit.repository';
import { UserRepository } from '../../../domain/user/user.repository';
import { UserNotFoundError } from '../../user/registerUser/error/userNotFound.error';
import { CreateHabbitCommand } from './createHabbit.command';
import { HabbitAlreadyExistsError } from './error/habbitAlreadyExists.error';

export class CreateHabbitCommandHandler {
  constructor(
    private readonly repository: HabbitRepository,
    private readonly userRepository: UserRepository,
  ) {}

  handle(command: CreateHabbitCommand): void {
    if (!this.userRepository.findById(command.userId)) {
      throw UserNotFoundError.withId(command.userId);
    }

    if (this.repository.findByName(command.name)) {
      throw HabbitAlreadyExistsError.withName(command.name);
    }

    this.repository.save(
      Habbit.create(
        command.id,
        command.name,
        command.description,
        command.frequencyType,
        command.frequencyAmount,
        command.completionTime,
        command.restTime,
        command.userId,
      ),
    );
  }
}
