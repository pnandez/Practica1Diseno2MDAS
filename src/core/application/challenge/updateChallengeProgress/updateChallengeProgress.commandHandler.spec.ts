import { ChallengeInMemoryRepository } from '../../../infra/repository/challenge/challenge.inMemoryRepository';
import { HabbitInMemoryRepository } from '../../../infra/repository/habbit/habbit.inMemoryRepository';
import { ChallengeMother } from '../../../test/challenge/challengeMother';
import { HabbitMother } from '../../../test/habbit/habbitMother';
import { UpdateChallengeProgressCommand } from './updateChallengeProgress.command';
import { UpdateChallengeProgressCommandHandler } from './updateChallengeProgress.commandHandler';

describe('update challenge progress should', () => {
  const prepareScenario = () => {
    const challengeRepository = new ChallengeInMemoryRepository();
    const habbitRepository = new HabbitInMemoryRepository();
    const habbit = HabbitMother.create();
    habbitRepository.save(habbit);
    const startDate = 1700603020000;
    const numberOfTimesToRepeat = 5;
    const challenge = new ChallengeMother()
      .withHabbitId(habbit.id.toPrimitives())
      .withNumberOfTimesToRepeatHabbit(numberOfTimesToRepeat)
      .withStartDate(startDate)
      .build();
    challengeRepository.save(challenge);
    const handler = new UpdateChallengeProgressCommandHandler(
      challengeRepository,
    );
    return {
      challenge,
      handler,
      habbit,
      startDate,
      numberOfTimesToRepeat,
    };
  };

  it('reduce remaining times by 1', () => {
    const { habbit, challenge, handler, startDate, numberOfTimesToRepeat } =
      prepareScenario();

    const command = new UpdateChallengeProgressCommand(
      habbit.id.toPrimitives(),
      startDate + 500,
    );

    handler.handle(command);

    expect(challenge.remainingTimesToComplete).toBe(numberOfTimesToRepeat - 1);
  });
});
