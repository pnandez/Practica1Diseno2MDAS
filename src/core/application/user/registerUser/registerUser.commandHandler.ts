import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/user/user.repository';
import { User } from '../../../domain/user/user';
import { RegisterUserCommand } from './registerUser.command';
import { UserAlreadyExistsError } from './error/userAlreadyExists.error';

@Injectable()
export class RegisterUserCommandHandler {
  constructor(
    @Inject(UserRepository) private readonly repository: UserRepository,
  ) {}

  handle(command: RegisterUserCommand) {
    if (this.repository.findByUsername(command.username)) {
      throw UserAlreadyExistsError.withUsername(command.username);
    }

    const user = new User(command.id, command.username, command.fullname);

    this.repository.save(user);
  }
}
