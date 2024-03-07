import { HabbitTime } from './habbitTime';
import { InvalidHabbitFrequency } from './error/invalidHabbitFrequency.error';
import { InvalidHabbitDuration } from './error/invalidHabbitDuration.error';
import { RequiredHabbitAttribute } from './requiredHabbitAttribute';
import { InvalidHabbitDataError } from './error/incompleteHabbitData.error';

export class HabbitFrequency extends RequiredHabbitAttribute {
  private constructor(
    private readonly type: FrequencyType,
    private readonly amount: number,
    private time: HabbitTime,
  ) {
    super();
    if (!this.isValid(type)) {
      throw InvalidHabbitDataError.withAttribute('type');
    }

    if (!this.isValid(amount)) {
      throw InvalidHabbitDataError.withAttribute('amount');
    }
  }

  public static create(
    type: string,
    amount: number,
    completionTime: number,
    restTime: number,
  ): HabbitFrequency {
    const frequencyType = frequencyTypeFromValue(type) || null;
    const time = HabbitTime.create(completionTime, restTime);

    if (!frequencyType) {
      throw InvalidHabbitFrequency.withFrequency(type);
    }

    const oneDayInSeconds = 86400;

    if (
      frequencyType === FrequencyType.DAY &&
      completionTime >= oneDayInSeconds
    ) {
      throw InvalidHabbitDuration.withFrequencyAndDuration(
        frequencyType,
        completionTime,
      );
    }

    return new HabbitFrequency(frequencyType, amount, time);
  }

  public toPrimitives() {
    return {
      frequencyType: this.type,
      frequencyAmount: this.amount,
      completionTime: this.time.toPrimitives().completionTime,
      restTime: this.time.toPrimitives().restTime,
    };
  }
}

function frequencyTypeFromValue(type: string): FrequencyType {
  const key = Object.keys(FrequencyType).find((k) => FrequencyType[k] === type);
  return FrequencyType[key];
}

enum FrequencyType {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}
