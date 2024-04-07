import { InvalidCostError } from './error/InvalidCost.Error';

export class ChallengeCost {
  private constructor(private readonly value: number) {}

  static create(value: number): ChallengeCost {
    if (value < 0) {
      throw InvalidCostError.withLessThanZero();
    }
    if (!Number.isSafeInteger(value)) {
      throw InvalidCostError.withDecimalValue();
    }

    return new ChallengeCost(value);
  }
}
