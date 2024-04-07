import { BaseError } from '../../error/baseError';

export class InvalidCostError extends BaseError {
  private constructor(message: string) {
    super('invalid-cost-error', message);
  }

  public static withLessThanZero(): InvalidCostError {
    return new InvalidCostError('The cost must be greater than zero.');
  }

  public static withDecimalValue(): InvalidCostError {
    return new InvalidCostError('The cost must be not contain cents.');
  }

  public static withOverLimitValue(limit: number): InvalidCostError {
    return new InvalidCostError(`The cost must be less than ${limit}.`);
  }
}
