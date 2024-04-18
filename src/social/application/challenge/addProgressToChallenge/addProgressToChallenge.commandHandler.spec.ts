import { EventStoreDb } from 'social/infra/events/eventStoreDb';
import { AddProgressToChallengeCommandHandler } from './addProgressToChallenge.commandHandler';
import { ChallengesPerHabbitInMemoryReadModel } from 'social/infra/readModel/challengesPerHabbit.inMemory.readModel';
import { ChallengeRepository } from 'social/domain/challenge/challenge.repository';
import { ChallengesPerHabbit } from 'social/domain/challenge/readModels/challengesPerHabbit.readModel';
import { v4 } from 'uuid';
import { ChallengeMother } from 'social/test/challenge/challengeMother';
import { AddProgressToChallengeCommand } from './addProgressToChallenge.command';

describe('add progress to challenge', () => {
  let eventPublisher: EventStoreDb;
  let challengeRepository: ChallengeRepository;
  let challengesPerHabbitReadModel: ChallengesPerHabbit;
  let handler: AddProgressToChallengeCommandHandler;
  let habbitId: string;
  let command: AddProgressToChallengeCommand;
  const target = 10;
  let completedChallengeId: string;
  let uncompletedChallengeId: string;
  const progress = 3;

  beforeEach(() => {
    challengesPerHabbitReadModel = new ChallengesPerHabbitInMemoryReadModel();
    eventPublisher = new EventStoreDb(challengesPerHabbitReadModel);
    challengeRepository = eventPublisher;
    handler = new AddProgressToChallengeCommandHandler(
      eventPublisher,
      challengeRepository,
      challengesPerHabbitReadModel,
    );

    habbitId = v4();

    completedChallengeId = v4();
    uncompletedChallengeId = v4();
  });

  it('should save progress', async () => {
    eventPublisher.publishEvents([
      ...new ChallengeMother()
        .withId(completedChallengeId)
        .withTarget(target)
        .withHabbitId(habbitId)
        .withChallengeStarted()
        .releaseEvents(),
      ...new ChallengeMother()
        .withId(uncompletedChallengeId)
        .withTarget(target)
        .withHabbitId(habbitId)
        .withChallengeStarted()
        .releaseEvents(),
    ]);

    command = new AddProgressToChallengeCommand(habbitId, progress);

    handler.handle(command);

    const challengeIds = challengesPerHabbitReadModel.of(habbitId);

    expect(challengeIds).toHaveLength(2);
    const challenges = challengeIds.map((id) =>
      challengeRepository.findByIdOrException(id),
    );
    expect(challenges.every((c) => c.isFinished())).toBeFalsy();
    expect(challenges.every((c) => c.remainingProgress() > 0)).toBeTruthy();
  });

  it('should save progress and mark as completed if target is reached', async () => {
    eventPublisher.publishEvents([
      ...new ChallengeMother()
        .withId(completedChallengeId)
        .withTarget(progress)
        .withHabbitId(habbitId)
        .withChallengeStarted()
        .releaseEvents(),
      ...new ChallengeMother()
        .withId(uncompletedChallengeId)
        .withTarget(target)
        .withHabbitId(habbitId)
        .withChallengeStarted()
        .releaseEvents(),
    ]);

    command = new AddProgressToChallengeCommand(habbitId, progress);

    handler.handle(command);

    const challengeIds = challengesPerHabbitReadModel.of(habbitId);

    expect(challengeIds).toHaveLength(2);
    const completedChallenge =
      challengeRepository.findByIdOrException(completedChallengeId);

    const uncompletedChallenge = challengeRepository.findByIdOrException(
      uncompletedChallengeId,
    );

    expect(completedChallenge.isFinished()).toBeTruthy();
    expect(uncompletedChallenge.isFinished()).toBeFalsy();
  });
});
