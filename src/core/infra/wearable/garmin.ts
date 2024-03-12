import { HabbitWearable } from '../../domain/habbit/habbitWearable';
import { WearableManufacturer } from './manufacturer.values';

export class GarminHabbitWearbable extends HabbitWearable {
  private constructor(deviceId: string) {
    super(deviceId, WearableManufacturer.GARMIN);
  }

  static create(deviceId: string) {
    return new GarminHabbitWearbable(deviceId);
  }

  isProgressValid(date: number) {
    return date % 2 === 0;
  }
}
