import { Habbit } from '../../../domain/habbit/habbit';
import { HabbitInMemoryRepository } from '../../../infra/habbit/habbit.inMemoryRepository';
import { UserInMemoryRepository } from '../../../infra/user.inMemoryRepository';
import { HabbitMother } from '../../../test/habbit/habbitMother';
import { UserMother } from '../../../test/user/userMother';
import { CreateHabbitCommand } from './createHabbit.command';
import { CreateHabbitCommandHandler } from './createHabbit.commandHandler';

describe('CreateHabbitCommandHandler should', () => {
  const prepareScenario = () => {
    const repository = new HabbitInMemoryRepository();
    const userRepository = new UserInMemoryRepository();
    const handler = new CreateHabbitCommandHandler(repository, userRepository);
    const user = new UserMother().build();
    const createdHabbit = new HabbitMother().withUserId(user.id).build();
    userRepository.save(user);
    return { handler, repository, userRepository, user, createdHabbit };
  };

  it('should create a habbit', () => {
    const { handler, repository, createdHabbit } = prepareScenario();

    const createHabbitCommand = createCommandFromHabbit(createdHabbit);

    handler.handle(createHabbitCommand);

    expect(repository.isHabbitSaved(createdHabbit)).toBeTruthy();
  });

  it('throw error when habbit name already exists', () => {
    const { handler, repository, createdHabbit } = prepareScenario();

    repository.save(createdHabbit);

    const createHabbitCommand = createCommandFromHabbit(createdHabbit);

    expect(() => handler.handle(createHabbitCommand)).toThrow();
  });

  it('throw error when habbit data is incomplete', () => {
    const { handler, user } = prepareScenario();

    const noNameCommand = CreateHabbitCommand.fromObject({
      id: 'id',
      name: null,
      description: 'description',
      frequencyType: 'type',
      frequencyAmount: 1,
      completionTime: 1,
      restTime: 1,
      userId: user.id,
    });

    expect(() => handler.handle(noNameCommand)).toThrow(
      'Attribute with name: name is required',
    );
  });
});

function createCommandFromHabbit(habbit: Habbit) {
  return CreateHabbitCommand.fromObject(habbit.toPrimitives());
}
