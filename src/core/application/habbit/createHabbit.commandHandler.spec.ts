import { Habbit } from '../../domain/habbit/habbit';
import { HabbitInMemoryRepository } from '../../infra/habbit/habbit.inMemoryRepository';
import { UserInMemoryRepository } from '../../infra/user.inMemoryRepository';
import { HabbitMother } from '../../test/habbit/habbitMother';
import { UserMother } from '../../test/user/userMother';
import { CreateHabbitCommand } from './createHabbit.command';
import { CreateHabbitCommandHandler } from './createHabbit.commandHandler';

describe('CreateHabbitCommandHandler should', () => {
  const prepareScenario = () => {
    const repository = new HabbitInMemoryRepository();
    const userRepository = new UserInMemoryRepository();
    const handler = new CreateHabbitCommandHandler(repository, userRepository);
    return { handler, repository, userRepository };
  };

  it('should create a habbit', () => {
    const { handler, repository, userRepository } = prepareScenario();
    const user = new UserMother().build();
    const createdHabbit = new HabbitMother().withUserId(user.id).build();
    const createHabbitCommand = createCommandFromHabbit(createdHabbit);

    userRepository.save(user);
    handler.handle(createHabbitCommand);

    expect(repository.isHabbitSaved(createdHabbit)).toBeTruthy();
  });
});

function createCommandFromHabbit(habbit: Habbit) {
  return CreateHabbitCommand.fromObject(habbit.toPrimitives());
}
