import { HabbitFrequency } from './habbitFrequency';
import { HabbitDescription } from './habbitDescription';
import { HabbitId } from './habbitId';
import { HabbitName } from './habbitName';
import { HabbitUserId } from './habbitUserId';
import { HabbitProgressRecord } from './habbitProgressRecord';
import { WearableService } from '../wearable/wearable.service';

export class Habbit {
  readonly progressRecords: HabbitProgressRecord[];

  private constructor(
    readonly id: HabbitId,
    readonly name: HabbitName,
    readonly description: HabbitDescription,
    readonly frequency: HabbitFrequency,
    readonly userId: HabbitUserId,
    readonly wearableId: string,
    readonly creationDate: Date,
    readonly updateDate: Date,
  ) {
    this.progressRecords = [];
  }

  recordProgress(
    date: number,
    observations: string,
    wearableService?: WearableService,
  ): void {
    const record = HabbitProgressRecord.create(
      date,
      observations,
      wearableService?.validateProgress(this.wearableId, date),
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
    habbitWearable?: string,
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
    wearableId: string;
    progressRecords: {
      date: number;
      observations: string;
      validated?: boolean;
    }[];
  } {
    return {
      id: this.id.toPrimitives(),
      name: this.name.toPrimitives(),
      description: this.description.toPrimitives(),
      ...this.frequency.toPrimitives(),
      userId: this.userId.toPrimitives(),
      wearableId: this.wearableId,
      progressRecords: this.progressRecords.map((record) =>
        record.toPrimitives(),
      ),
    };
  }
}
