export abstract class HabbitWearable {
  constructor(readonly deviceId: string) {}

  abstract validateProgress(date: number);
}
