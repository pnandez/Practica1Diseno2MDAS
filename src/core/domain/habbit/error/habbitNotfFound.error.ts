import { BaseError } from '../../error/baseError';

export class HabbitNotFoundError extends BaseError {
  private constructor(message: string) {
    super('habbit-not-found', message);
  }

  public static withHabbitId(habbitId: string): HabbitNotFoundError {
    return new HabbitNotFoundError(`Habbit with ${habbitId} does not exist.`);
  }
}
