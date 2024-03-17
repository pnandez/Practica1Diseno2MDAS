import { HabbitFrequency } from './habbitFrequency';
import { HabbitDescription } from './habbitDescription';
import { HabbitId } from './habbitId';
import { HabbitName } from './habbitName';
import { HabbitUserId } from './habbitUserId';
import { HabbitProgressRecord } from './habbitProgressRecord';
import { WearableService } from '../wearable/wearable.service';
import { HabbitReminder } from './habbitReminder';
import { DuplicateReminderError } from './error/duplicateReminder.error';
import { MaximumHabbitRemindersReachedError } from './error/maximumHabbitRemindersReached.error';
import { AggregateRoot } from '../shared/aggregateRoot';
import { RegisteredProgressEvent } from './events/registerProgress/registeredProgress.event';
import { HabbitStatus } from './habbitStatus';
import { SuspendHabbitEvent } from './events/suspendHabbit/suspendHabbit.event';

export class Habbit extends AggregateRoot {
  readonly progressRecords: HabbitProgressRecord[];
  readonly reminders: HabbitReminder[];
  private readonly maximumReminderCount: number = 3;
  private creationDate: Date;
  private updateDate: Date;
  private status: HabbitStatus;

  private constructor(
    readonly id: HabbitId,
    readonly name: HabbitName,
    readonly description: HabbitDescription,
    readonly frequency: HabbitFrequency,
    readonly userId: HabbitUserId,
    readonly wearableId?: string,
  ) {
    super();
    this.progressRecords = [];
    this.reminders = [];
    this.creationDate = new Date();
    this.updateDate = new Date();
    this.status = HabbitStatus.available();
  }

  get currentStatus() {
    return this.status.toPrimitive();
  }

  recordProgress(
    date: number,
    observations: string,
    wearableService?: WearableService,
  ): void {
    const record = HabbitProgressRecord.create(
      date,
      observations,
      this.wearableId &&
        wearableService?.validateProgress(this.wearableId, date),
    );

    this.progressRecords.push(record);

    this.recordEvent(
      RegisteredProgressEvent.create(
        this.id.toPrimitives(),
        date,
        this.id.toPrimitives(),
      ),
    );
    this.updateDate = new Date();
  }

  addReminder(
    id: string,
    message: string,
    isActive: boolean,
    hourToNotify: number,
  ) {
    if (this.reminders.length >= this.maximumReminderCount) {
      throw MaximumHabbitRemindersReachedError.withHabbitName(
        this.name.toPrimitives(),
      );
    }

    if (this.reminders.some((r) => r.hourToNotify.hour === hourToNotify)) {
      throw DuplicateReminderError.withHourAndHabbitName(
        hourToNotify,
        this.name.toPrimitives(),
      );
    }
    const newReminder = HabbitReminder.create(
      id,
      message,
      isActive,
      hourToNotify,
    );

    this.reminders.push(newReminder);
  }

  suspend() {
    this.status = HabbitStatus.suspended();

    this.recordEvent(
      SuspendHabbitEvent.create(this.id.toPrimitives(), this.id.toPrimitives()),
    );
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
    wearableId?: string;
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
