import { UserInMemoryRepository } from '../../../infra/user.inMemoryRepository';
import { UserMother } from '../../../test/user/userMother';
import { RegisterUserCommand } from './registerUser.command';
import { RegisterUserCommandHandler } from './registerUser.commandHandler';

describe('RegisterUserCommandHandler', () => {
  const prepareScenario = () => {
    const repository = new UserInMemoryRepository();
    const handler = new RegisterUserCommandHandler(repository);
    return { repository, handler };
  };

  it('should register the user', () => {
    const { repository, handler } = prepareScenario();

    // Given
    const user = UserMother.create();

    const command = new RegisterUserCommand(
      user.id,
      user.username,
      user.fullname,
    );

    handler.handle(command);

    expect(repository.isUserSaved(user)).toBeTruthy();
  });

  it('should throw an error if the user already exists', () => {
    const { repository, handler } = prepareScenario();

    // Given
    const user = UserMother.create();
    repository.withUsers([user]);

    const command = new RegisterUserCommand(
      user.id,
      user.username,
      user.fullname,
    );

    expect(() => handler.handle(command)).toThrow();
  });

  it('should throw an error if the user is not valid', () => {
    // Given
    // When
    // Then
  });
});
