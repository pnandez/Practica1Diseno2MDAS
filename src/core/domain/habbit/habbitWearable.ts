export abstract class HabbitWearable {
  protected constructor(
    readonly deviceId: string,
    readonly manufacturer: number,
  ) {}

  toPrimitives() {
    return {
      wearableDeviceId: this.deviceId,
    };
  }

  abstract isProgressValid(date: number);
}
