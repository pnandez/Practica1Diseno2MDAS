import { HabbitTime } from './habbitTime';
import { InvalidHabbitFrequency } from './error/invalidHabbitFrequency.error';
import { InvalidHabbitDuration } from './error/invalidHabbitDuration.error';

export class HabbitFrquency {
  private constructor(
    private readonly type: FrequencyType,
    private readonly amount: number,
    private time: HabbitTime,
  ) {}

  public static create(
    type: string,
    amount: number,
    completionTime: number,
    restTime: number,
  ): HabbitFrquency {
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

    return new HabbitFrquency(frequencyType, amount, time);
  }

  public toPrimitives() {
    return {
      type: this.type,
      amount: this.amount,
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
