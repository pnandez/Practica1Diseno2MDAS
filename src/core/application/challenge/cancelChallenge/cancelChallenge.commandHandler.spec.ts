import { ChallengeInMemoryRepository } from '../../../infra/repository/challenge/challenge.inMemoryRepository';
import { ChallengeMother } from '../../../test/challenge/challengeMother';
import { CancelChallengeCommand } from './cancelChallenge.command';
import { CancelChallengeCommandHandler } from './cancelChallenge.commandHandler';

describe('cancel challenge should', () => {
  const prepareScenario = () => {
    const habbitId = 'habbitId';
    const challenge = new ChallengeMother().withHabbitId(habbitId).build();
    const challengeRepository = new ChallengeInMemoryRepository();
    challengeRepository.save(challenge);
    const handler = new CancelChallengeCommandHandler(challengeRepository);
    return { challenge, habbitId, challengeRepository, handler };
  };

  it('change a habbit Status to cancelled', () => {
    const { challenge, handler } = prepareScenario();

    const command = new CancelChallengeCommand(challenge.id);

    handler.handle(command);

    expect(challenge.currentStatus).toBe('cancelled');
  });

  it('throws error when invalid status previous status', () => {
    const { handler, challengeRepository } = prepareScenario();

    const completedStatus = 'completed';
    const completedChallenge = new ChallengeMother()
      .withStatus(completedStatus)
      .build();

    challengeRepository.save(completedChallenge);

    let command = new CancelChallengeCommand(completedChallenge.id);

    expect(() => handler.handle(command)).toThrow(
      `Actual status: ${completedStatus} on challenge ${completedChallenge.id} does not allow to cancel the challenge`,
    );

    const cancelledStatus = 'cancelled';
    const cancelledChallenge = new ChallengeMother()
      .withStatus(cancelledStatus)
      .build();

    challengeRepository.save(cancelledChallenge);

    command = new CancelChallengeCommand(cancelledChallenge.id);

    expect(() => handler.handle(command)).toThrow(
      `Actual status: ${cancelledStatus} on challenge ${cancelledChallenge.id} does not allow to cancel the challenge`,
    );
  });
});
