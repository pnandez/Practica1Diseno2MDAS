import { BaseError } from '../../../../domain/error/baseError';

export class HabbitAlreadyExistsError extends BaseError {
  private constructor(message: string) {
    super('habbit-already-exists', message);
  }

  static withName(name: string) {
    return new HabbitAlreadyExistsError(
      `Habbit with name ${name} already exists`,
    );
  }
}
