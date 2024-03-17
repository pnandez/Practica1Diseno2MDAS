import { Habbit } from '../../../domain/habbit/habbit';
import { EventStore } from '../../../infra/events/eventStore';
import { HabbitInMemoryRepository } from '../../../infra/repository/habbit/habbit.inMemoryRepository';
import { UserInMemoryRepository } from '../../../infra/repository/user/user.inMemoryRepository';
import { GarminWearable } from '../../../infra/wearable/garminWearable.service';
import { HabbitMother } from '../../../test/habbit/habbitMother';
import { AddProgressCommandHandler } from '../addProgress/addProgress.commandHandler';
import { SuspendHabbitCommand } from './suspendHabbit.command';
import { SuspendHabbitCommandHandler } from './suspendHabbit.commandHandler';

describe('suspend habbit should', () => {
  const prepareScenario = () => {
    const eventStore = new EventStore();
    const repository = new HabbitInMemoryRepository();
    const userRepository = new UserInMemoryRepository();
    const handler = new SuspendHabbitCommandHandler(repository, eventStore);
    const createdHabbit: Habbit = new HabbitMother()
      .withUserId('userId')
      .build();
    repository.save(createdHabbit);
    const habbitId = createdHabbit.id.toPrimitives();
    const garminService = new GarminWearable();
    const handlerWithGarmin = new AddProgressCommandHandler(
      repository,
      garminService,
    );
    return {
      handler,
      repository,
      userRepository,
      habbitId,
      createdHabbit,
      handlerWithGarmin,
      garminService,
      eventStore,
    };
  };

  it('change habbit status to suspended', () => {
    const { handler, habbitId, createdHabbit } = prepareScenario();

    const command = new SuspendHabbitCommand(habbitId);

    handler.handle(command);

    expect(createdHabbit.currentStatus).toBe('suspended');
  });

  it('publishes an event', () => {
    const { handler, habbitId, eventStore } = prepareScenario();

    const command = new SuspendHabbitCommand(habbitId);

    handler.handle(command);

    expect(eventStore.events.length).toBe(1);
  });

  it('throws an error if the habbit doesnt exist', () => {
    const { handler } = prepareScenario();

    const fakeHabbitId = 'fakeId';

    const command = new SuspendHabbitCommand(fakeHabbitId);

    expect(() => handler.handle(command)).toThrow(
      `Habbit with ${fakeHabbitId} does not exist.`,
    );
  });
});
