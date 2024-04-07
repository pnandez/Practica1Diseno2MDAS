import { CoreMock } from 'social/infra/core/coreMockDatabase';
import { EventStoreDb } from 'social/infra/events/eventStoreDb';
import { AddChallengeCommandHandler } from './addChallenge.commandHandler';
import { v4 } from 'uuid';
import { AddChallengeCommand } from './addChallenge.command';
import { ChallengeStartedEvent } from 'social/domain/challenge/event/ChallengeStarted.event';

describe('add challenge', () => {
  let eventPublisher: EventStoreDb;
  let coreQueryService: CoreMock;
  let handler: AddChallengeCommandHandler;
  let habbitID: string;
  let userId: string;

  beforeEach(() => {
    eventPublisher = new EventStoreDb();
    coreQueryService = new CoreMock();

    handler = new AddChallengeCommandHandler(coreQueryService, eventPublisher);

    habbitID = v4();
    userId = v4();
    coreQueryService.addUserId(userId);
  });

  it('should create a new challenge', () => {
    coreQueryService.addHabbitId(habbitID);

    const command = new AddChallengeCommand(
      v4(),
      habbitID,
      10,
      'partner',
      'project',
      10,
      new Date(Date.now() + 10000),
      userId,
    );

    handler.handle(command);

    expect(eventPublisher.events.length).toBe(1);
    expect(
      eventPublisher.hasPublishedEvent(
        ChallengeStartedEvent.Type,
        command.challengeId,
      ),
    ).toBe(true);
  });

  it('should throw an error if habbit does not exist', () => {
    const command = new AddChallengeCommand(
      v4(),
      habbitID,
      10,
      'partner',
      'project',
      10,
      new Date(Date.now() + 10000),
      userId,
    );

    expect(() => handler.handle(command)).toThrow();

    expect(eventPublisher.events.length).toBe(0);
  });

  it('should throw error if incorrect challenge parameters', () => {
    coreQueryService.addHabbitId(habbitID);

    const command = new AddChallengeCommand(
      v4(),
      habbitID,
      10,
      'partner',
      'project',
      10.1,
      new Date(Date.now() + 10000),
      userId,
    );

    expect(() => handler.handle(command)).toThrow();

    expect(eventPublisher.events.length).toBe(0);
  });
});
