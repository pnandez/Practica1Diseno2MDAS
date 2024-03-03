import { BaseError } from '../../error/baseError';

export class InvalidHabbitDuration extends BaseError {
  private constructor(message: string) {
    super('invalid-habbit-duration', message);
  }

  static withFrequencyAndDuration(frequency: string, duration: number) {
    return new InvalidHabbitDuration(
      `Duration ${duration} is invalid for frequency ${frequency}`,
    );
  }
}
