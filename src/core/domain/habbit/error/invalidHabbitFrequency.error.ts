import { BaseError } from '../../error/baseError';

export class InvalidHabbitFrequency extends BaseError {
  private constructor(message: string) {
    super('invalid-habbit-frequency', message);
  }

  static withFrequency(frequency: string) {
    return new InvalidHabbitFrequency(`Frequency ${frequency} is invalid.`);
  }
}
