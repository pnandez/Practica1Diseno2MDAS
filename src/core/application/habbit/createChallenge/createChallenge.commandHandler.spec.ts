import { ChallengeInMemoryRepository } from '../../../infra/challenge/challenge.inMemoryRepository';
import { HabbitInMemoryRepository } from '../../../infra/habbit/habbit.inMemoryRepository';
import { HabbitMother } from '../../../test/habbit/habbitMother';
import { CreateChallengeCommand } from './createChallenge.command';
import { CreateChallengeCommandHandler } from './createChallenge.commandHandler';
import { v4 as uuidv4 } from 'uuid';

describe('create challenge should', () => {
  const prepareScenario = () => {
    const habbit = new HabbitMother().build();
    const habbitRepository = new HabbitInMemoryRepository();
    habbitRepository.save(habbit);
    const habbitId = habbit.id.toPrimitives();
    const challengeRepository = new ChallengeInMemoryRepository();
    const handler = new CreateChallengeCommandHandler(
      habbitRepository,
      challengeRepository,
    );
    return { handler, habbitId, challengeRepository };
  };

  it('create challenge', () => {
    const { handler, habbitId, challengeRepository } = prepareScenario();

    const command = new CreateChallengeCommand(
      uuidv4(),
      habbitId,
      'This is a short description',
      2,
      Date.now() - 10000,
      Date.now(),
    );

    handler.handle(command);

    expect(challengeRepository.challenges.length).toBeGreaterThan(0);
  });
});
