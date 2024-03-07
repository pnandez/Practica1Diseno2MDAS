import { InvalidHabbitDataError } from './error/incompleteHabbitData.error';
import { RequiredHabbitAttribute } from './requiredHabbitAttribute';

export class HabbitTime extends RequiredHabbitAttribute {
  private constructor(
    private readonly completionTime: number,
    private readonly restTime: number,
  ) {
    super();
    if (this.isNullOrUndefined(completionTime)) {
      throw InvalidHabbitDataError.withAttribute('completionTime');
    }
    if (this.isNullOrUndefined(restTime)) {
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
