import { CoreMock } from 'social/infra/core/coreMockDatabase';
import { EventStoreDb } from 'social/infra/events/eventStoreDb';
import { v4 } from 'uuid';
import { AddUsersToChallengeCommandHandler } from './addUsersToChallenge.commandHandler';
import { AddUsersToChallengeCommand } from './addUsersToChallenge.command';
import { ChallengeMother } from 'social/test/challenge/challengeMother';
import { UsersAddedEvent } from 'social/domain/challenge/event/UsersAdded.event';

describe('add users to challenge', () => {
  let eventPublisher: EventStoreDb;
  let coreQueryService: CoreMock;
  let handler: AddUsersToChallengeCommandHandler;
  let challengeId: string;
  let userIds: string[];

  beforeEach(() => {
    eventPublisher = new EventStoreDb();
    coreQueryService = new CoreMock();

    handler = new AddUsersToChallengeCommandHandler(
      coreQueryService,
      eventPublisher,
      eventPublisher,
    );

    challengeId = v4();

    userIds = [v4(), v4()];

    userIds.forEach((userId) => {
      coreQueryService.addUserId(userId);
    });

    eventPublisher.publishEvents(
      new ChallengeMother()
        .withId(challengeId)
        .withChallengeStarted()
        .releaseEvents(),
    );
  });

  it('should add users to challenge', () => {
    const command = new AddUsersToChallengeCommand(challengeId, userIds);

    handler.handle(command);

    expect(eventPublisher.events.length).toBeGreaterThan(0);
    expect(
      eventPublisher.hasPublishedEvent(UsersAddedEvent.Type, challengeId),
    ).toBe(true);
  });

  it('should throw error if challenge is not found', () => {
    const command = new AddUsersToChallengeCommand('challengeId', userIds);
    expect(() => handler.handle(command)).toThrow();
    expect(
      eventPublisher.hasPublishedEvent(UsersAddedEvent.Type, challengeId),
    ).toBe(false);
  });

  it('should throw error if incorrect a user doesnt exist', () => {
    const command = new AddUsersToChallengeCommand(challengeId, [
      ...userIds,
      'userId',
    ]);
    expect(() => handler.handle(command)).toThrow();
    expect(
      eventPublisher.hasPublishedEvent(UsersAddedEvent.Type, challengeId),
    ).toBe(false);
  });
});
