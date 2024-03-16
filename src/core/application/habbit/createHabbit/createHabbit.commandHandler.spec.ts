import { Habbit } from '../../../domain/habbit/habbit';
import { HabbitInMemoryRepository } from '../../../infra/repository/habbit/habbit.inMemoryRepository';
import { UserInMemoryRepository } from '../../../infra/repository/user/user.inMemoryRepository';
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
    const baseHabbit = new HabbitMother().withUserId(user.id).build();
    userRepository.save(user);
    return { handler, repository, userRepository, user, baseHabbit };
  };

  it('should create a habbit', () => {
    const { handler, repository, baseHabbit } = prepareScenario();

    const createHabbitCommand = createCommandFromHabbit(baseHabbit);

    handler.handle(createHabbitCommand);

    expect(repository.isHabbitSaved(baseHabbit)).toBeTruthy();
  });

  it('should create a habbit with garmin wearable', () => {
    const { handler, repository, baseHabbit } = prepareScenario();

    const createHabbitCommand = createCommandFromHabbit(
      baseHabbit,
      'garminDevice1234',
    );

    handler.handle(createHabbitCommand);

    expect(repository.isHabbitSaved(baseHabbit)).toBeTruthy();
  });

  it('throw error when habbit name already exists', () => {
    const { handler, repository, baseHabbit: baseHabbit } = prepareScenario();

    repository.save(baseHabbit);

    const createHabbitCommand = createCommandFromHabbit(baseHabbit);

    expect(() => handler.handle(createHabbitCommand)).toThrow();
  });

  it('throw error when habbit data is incomplete', () => {
    const { handler, user } = prepareScenario();

    const noNameCommand = CreateHabbitCommand.fromObject({
      id: 'id',
      description: 'description',
      frequencyType: 'day',
      frequencyAmount: 1,
      completionTime: 1,
      restTime: 1,
      userId: user.id,
      name: null,
    });

    expect(() => handler.handle(noNameCommand)).toThrow(
      'Attribute with name: name is required',
    );
  });
});

function createCommandFromHabbit(
  habbit: Habbit,
  habbitDeviceId?: string,
  habbitDeviceType?: number,
) {
  return CreateHabbitCommand.fromObject({
    ...habbit.toPrimitives(),
    habbitDeviceId,
    habbitDeviceType,
  });
}
