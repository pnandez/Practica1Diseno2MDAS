import { InvalidHabbitDataError } from './error/incompleteHabbitData.error';
import { RequiredHabbitAttribute } from './requiredHabbitAttribute';

export class HabbitTime extends RequiredHabbitAttribute {
  private constructor(
    private readonly completionTime: number,
    private readonly restTime: number,
  ) {
    super();
    if (!this.isValid(completionTime)) {
      throw InvalidHabbitDataError.withAttribute('completionTime');
    }
    if (!this.isValid(restTime)) {
      throw InvalidHabbitDataError.withAttribute('restTime');
    }
  }

  public static create(completionTime: number, restTime: number): HabbitTime {
    return new HabbitTime(completionTime, restTime);
  }

  public toPrimitives() {
    return {
      completionTime: this.completionTime,
      restTime: this.restTime,
    };
  }
}
