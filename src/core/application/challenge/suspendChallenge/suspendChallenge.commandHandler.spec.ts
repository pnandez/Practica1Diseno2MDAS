import { ChallengeInMemoryRepository } from '../../../infra/repository/challenge/challenge.inMemoryRepository';
import { ChallengeMother } from '../../../test/challenge/challengeMother';
import { SuspendChallengeCommand } from './suspendChallenge.command';
import { SuspendChallengeCommandHandler } from './suspendChallenge.commandHandler';

describe('suspend challenge should', () => {
  const prepareScenario = () => {
    const habbitId = 'habbitId';
    const challenge = new ChallengeMother().withHabbitId(habbitId).build();
    const challengeRepository = new ChallengeInMemoryRepository();
    challengeRepository.save(challenge);
    const handler = new SuspendChallengeCommandHandler(challengeRepository);
    return { challenge, habbitId, challengeRepository, handler };
  };

  it('change challenge status to suspended', () => {
    const { challenge, habbitId, handler } = prepareScenario();

    const command = new SuspendChallengeCommand(habbitId);

    handler.handle(command);

    expect(challenge.currentStatus).toBe('suspended');
  });
});
