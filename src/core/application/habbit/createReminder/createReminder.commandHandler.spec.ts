import { HabbitInMemoryRepository } from '../../../infra/repository/habbit/habbit.inMemoryRepository';
import { HabbitMother } from '../../../test/habbit/habbitMother';
import { CreateReminderCommand } from './createReminder.command';
import { CreateReminderCommandHandler } from './createReminder.commandHandler';

describe('create Reminder should', () => {
  const prepareScenario = () => {
    const habbit = new HabbitMother().build();
    const habbitRepository = new HabbitInMemoryRepository();
    const handler = new CreateReminderCommandHandler(habbitRepository);
    habbitRepository.save(habbit);
    const habbitId = habbit.id.toPrimitives();
    return { habbitId, habbitRepository, handler, habbit };
  };

  it('save reminder', () => {
    const { habbitId, habbitRepository, handler } = prepareScenario();

    const command = new CreateReminderCommand(
      'id',
      habbitId,
      'test reminder',
      true,
      1,
    );

    handler.handle(command);

    const savedHabbit = habbitRepository.findById(habbitId);

    expect(savedHabbit.reminders.at(0).hourToNotify.hour).toBe(
      command.hourToNotify,
    );
    expect(savedHabbit.reminders.at(0).id).toBe(command.id);
    expect(savedHabbit.reminders.at(0).message).toBe(command.message);
  });

  it('throw error if habbit is not found', () => {
    const { handler } = prepareScenario();

    const habbitFakeId = 'habbitFakeId';
    const command = new CreateReminderCommand(
      'id',
      habbitFakeId,
      'test reminder',
      true,
      1,
    );

    expect(() => handler.handle(command)).toThrow(
      `Habbit with ${habbitFakeId} does not exist.`,
    );
  });

  it('throw error if hours is not a valid number', () => {
    const { habbitId, handler } = prepareScenario();

    const notValidHour = 24;

    const command = new CreateReminderCommand(
      'id',
      habbitId,
      'test reminder',
      true,
      notValidHour,
    );

    expect(() => handler.handle(command)).toThrow(
      `Reminder hour must be between 0 and 23. ${notValidHour} is not valid`,
    );
  });

  it('throw error if trying to add fourth reminder to habbit', () => {
    const { habbit: habbitWith3Reminders, handler } = prepareScenario();

    habbitWith3Reminders.addReminder('1', '1', true, 1);
    habbitWith3Reminders.addReminder('2', '2', true, 2);
    habbitWith3Reminders.addReminder('3', '3', true, 3);

    const command = new CreateReminderCommand(
      'id',
      habbitWith3Reminders.id.toPrimitives(),
      'test reminder',
      true,
      5,
    );

    expect(() => handler.handle(command)).toThrow(
      `Maximum habbit reminders reached for habbit: ${habbitWith3Reminders.name.toPrimitives()}. Please delete one of them and try again.`,
    );
  });

  it('throw error if hours is not a valid number', () => {
    const { habbitId, habbit, handler } = prepareScenario();

    const duplicateReminderHour = 3;

    habbit.addReminder('1', '1', true, duplicateReminderHour);

    const command = new CreateReminderCommand(
      'id',
      habbitId,
      'test reminder',
      true,
      duplicateReminderHour,
    );

    expect(() => handler.handle(command)).toThrow(
      `There is already an existing reminder for habbit: ${habbit.name.toPrimitives()} at ${duplicateReminderHour}`,
    );
  });
});
