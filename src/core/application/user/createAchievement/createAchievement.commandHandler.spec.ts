import { UserInMemoryRepository } from '../../../infra/repository/user/user.inMemoryRepository';
import { UserMother } from '../../../test/user/userMother';
import { CreateAchievementCommandHandler } from './createAchievement.commandHandler';
import { CreateAchievementCommand } from './createAchievement.command';

describe('createAchievement should', () => {
  const prepareScenario = () => {
    const user = new UserMother().build();
    const userRepository = new UserInMemoryRepository();
    userRepository.save(user);
    const handler = new CreateAchievementCommandHandler(userRepository);

    return { user, handler };
  };

  it('create a new achievement in user', () => {
    const { user, handler } = prepareScenario();

    const date = Date.now();
    const challengeId = 'challengeId';

    const command = new CreateAchievementCommand(challengeId, user.id, date);

    handler.handle(command);

    const achievement = user.lastAchievement;

    expect(achievement.challengeId).toEqual(challengeId);
    expect(achievement.date).toEqual(date);
  });
});
