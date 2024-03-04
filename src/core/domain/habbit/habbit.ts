import { HabbitFrequency } from './habbitFrequency';
import { HabbitDescription } from './habbitDescription';
import { HabbitId } from './habbitId';
import { HabbitName } from './habbitName';
import { HabbitUserId } from './habbitUserId';

export class Habbit {
  private constructor(
    readonly id: HabbitId,
    readonly name: HabbitName,
    readonly description: HabbitDescription,
    readonly frequency: HabbitFrequency,
    readonly userId: HabbitUserId,
    readonly creationDate: Date,
    readonly updateDate: Date,
  ) {}

  public static create(
    id: string,
    name: string,
    description: string,
    frequencyType: string,
    frequencyAmount: number,
    completionTime: number,
    restTime: number,
    userId: string,
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
  } {
    return {
      id: this.id.toPrimitives(),
      name: this.name.toPrimitives(),
      description: this.description.toPrimitives(),
      frequencyType: this.frequency.toPrimitives().type,
      frequencyAmount: this.frequency.toPrimitives().amount,
      completionTime: this.frequency.toPrimitives().completionTime,
      restTime: this.frequency.toPrimitives().restTime,
      userId: this.userId.toPrimitives(),
    };
  }
}
