import { HabbitFrequency } from './habbitFrequency';
import { HabbitDescription } from './habbitDescription';
import { HabbitId } from './habbitId';
import { HabbitName } from './habbitName';
import { HabbitUserId } from './habbitUserId';
import { HabbitProgressRecord } from './habbitProgressRecord';
import { HabbitWearable } from './habbitWearable';

export class Habbit {
  readonly progressRecords: HabbitProgressRecord[];

  private constructor(
    readonly id: HabbitId,
    readonly name: HabbitName,
    readonly description: HabbitDescription,
    readonly frequency: HabbitFrequency,
    readonly userId: HabbitUserId,
    readonly habbitWearable: HabbitWearable,
    readonly creationDate: Date,
    readonly updateDate: Date,
  ) {
    this.progressRecords = [];
  }

  recordProgress(date: number, observations: string): void {
    const record = HabbitProgressRecord.create(
      date,
      observations,
      this.habbitWearable?.isProgressValid(date) ?? false,
    );

    this.progressRecords.push(record);
  }

  public static create(
    id: string,
    name: string,
    description: string,
    frequencyType: string,
    frequencyAmount: number,
    completionTime: number,
    restTime: number,
    userId: string,
    habbitWearable?: HabbitWearable,
  ): Habbit {
    return new Habbit(
      HabbitId.create(id),
      HabbitName.create(name),
      HabbitDescription.create(description),
      HabbitFrequency.create(
        frequencyType,
        frequencyAmount,
        completionTime,
        restTime,
      ),
      HabbitUserId.create(userId),
      habbitWearable,
      new Date(),
      new Date(),
    );
  }

  toPrimitives(): {
    id: string;
    name: string;
    description: string;
    frequencyType: string;
    frequencyAmount: number;
    completionTime: number;
    restTime: number;
    userId: string;
    progressRecords: { date: number; observations: string }[];
  } {
    return {
      id: this.id.toPrimitives(),
      name: this.name.toPrimitives(),
      description: this.description.toPrimitives(),
      ...this.frequency.toPrimitives(),
      userId: this.userId.toPrimitives(),
      ...this.habbitWearable?.toPrimitives(),
      progressRecords: this.progressRecords.map((record) =>
        record.toPrimitives(),
      ),
    };
  }
}
