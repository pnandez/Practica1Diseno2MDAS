import { HabbitRepository } from '../../../domain/habbit/habbit.repository';
import { UserRepository } from '../../../domain/user/user.repository';
import { UserNotFoundError } from '../../user/registerUser/error/userNotFound.error';
import { GetHabbitsListQuery } from './getHabbitsList.query';
import { GetHabbitsListResponse } from './getHabbitsList.response';

export class GetHabbitsListQueryHandler {
  constructor(
    private readonly habbitRepository: HabbitRepository,
    private readonly userRepository: UserRepository,
  ) {}

  handle(query: GetHabbitsListQuery): GetHabbitsListResponse[] {
    if (!this.userRepository.findById(query.userId)) {
      throw UserNotFoundError.withId(query.userId);
    }

    return this.habbitRepository
      .findAllByUserId(query.userId)
      .map((habbit) => GetHabbitsListResponse.fromHabbit(habbit));
  }
}
