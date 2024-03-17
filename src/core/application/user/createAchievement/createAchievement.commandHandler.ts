import { CreateAchievementCommand } from './createAchievement.command';
import { UserRepository } from '@domain/user/user.repository';

export class CreateAchievementCommandHandler {
  constructor(private userRepository: UserRepository) {}

  handle(command: CreateAchievementCommand) {
    const user = this.userRepository.findById(command.userId);

    user.addNewAchievement(command.challengeId, command.date);

    this.userRepository.update(user);
  }
}
