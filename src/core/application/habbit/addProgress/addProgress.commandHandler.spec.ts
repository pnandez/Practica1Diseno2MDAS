import { InvalidProgressRecord } from '../../../domain/habbit/error/invalidProgressRecord.error';
import { Habbit } from '../../../domain/habbit/habbit';
import { HabbitInMemoryRepository } from '../../../infra/repository/habbit/habbit.inMemoryRepository';
import { UserInMemoryRepository } from '../../../infra/repository/user/user.inMemoryRepository';
import { GarminWearable } from '../../../infra/wearable/garminWearable.service';
import { HabbitMother } from '../../../test/habbit/habbitMother';
import { AddProgressCommand } from './addProgress.command';
import { AddProgressCommandHandler } from './addProgress.commandHandler';

describe('Add Progress should', () => {
  const prepareScenario = () => {
    const repository = new HabbitInMemoryRepository();
    const userRepository = new UserInMemoryRepository();
    const handler = new AddProgressCommandHandler(repository);
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
      handlerWithGarmin,
      garminService,
    };
  };

  it('register a progress', () => {
    const { handler, repository, habbitId } = prepareScenario();

    const command = new AddProgressCommand(
      habbitId,
      Date.now(),
      'Test progress',
    );

    handler.handle(command);

    expect(
      repository.findById(habbitId).progressRecords.length,
    ).toBeGreaterThan(0);
  });

  it('register a validated progress', () => {
    const { handlerWithGarmin, repository, habbitId } = prepareScenario();

    const command = new AddProgressCommand(
      habbitId,
      1710445506858,
      'Test progress',
    );

    handlerWithGarmin.handle(command);

    expect(
      repository.findById(habbitId).progressRecords.at(-1)?.validated,
    ).toBeTruthy();
  });

  it('throw an error if the habbit does not exist', () => {
    const { handler } = prepareScenario();
    const command = new AddProgressCommand(
      'Invalid habbit id',
      Date.now(),
      'Test progress',
    );

    expect(() => handler.handle(command)).toThrow();
  });

  it('throw an error if the date is in the future', () => {
    const { handler, habbitId } = prepareScenario();

    const dateInTheFuture = new Date(Date.now() + 1000);

    const command = new AddProgressCommand(
      habbitId,
      dateInTheFuture.getTime(),
      'Test progress',
    );

    expect(() => handler.handle(command)).toThrow(
      InvalidProgressRecord.withDateInFuture(dateInTheFuture.toISOString()),
    );
  });

  it('throw an error if the progress format is incorrect', () => {
    const { handler, habbitId } = prepareScenario();

    const command = new AddProgressCommand(
      habbitId,
      undefined,
      'Test progress',
    );

    expect(() => handler.handle(command)).toThrow(
      InvalidProgressRecord.withIncompleteDataIntroduced('date'),
    );
  });
});
