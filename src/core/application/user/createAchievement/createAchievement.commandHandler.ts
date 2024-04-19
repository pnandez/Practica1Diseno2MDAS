import { UserRepository } from '@core/domain/user/user.repository';
import { CreateAchievementCommand } from './createAchievement.command';

export class CreateAchievementCommandHandler {
  constructor(private userRepository: UserRepository) {}

  handle(command: CreateAchievementCommand) {
    const user = this.userRepository.findById(command.userId);

    user.addNewAchievement(command.challengeId, command.date);

    this.userRepository.update(user);
  }
}
