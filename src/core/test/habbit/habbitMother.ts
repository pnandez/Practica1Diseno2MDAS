import { Habbit } from '../../domain/habbit/habbit';
import { v4 as uuidv4 } from 'uuid';

export class HabbitMother {
  private id: string = uuidv4();
  private name: string = 'username';
  private description: string = 'fullname';
  private frequencyType: string = 'day';
  private frequencyAmount: number = 1;
  private completionTime: number = 600;
  private restTime: number = 600;
  private userId: string = 'userId';
  private wearableId: string = 'Wearable123';

  withId(id: string) {
    this.id = id;
    return this;
  }

  withName(name: string) {
    this.name = name;
    return this;
  }

  withDescription(description: string) {
    this.description = description;
    return this;
  }

  withFrequencyType(frequencyType: string) {
    this.frequencyType = frequencyType;
    return this;
  }

  withFrequencyAmount(frequencyAmount: number) {
    this.frequencyAmount = frequencyAmount;
    return this;
  }

  withCompletionTime(completionTime: number) {
    this.completionTime = completionTime;
    return this;
  }

  withRestTime(restTime: number) {
    this.restTime = restTime;
    return this;
  }

  withUserId(userId: string) {
    this.userId = userId;
    return this;
  }

  build(): Habbit {
    return Habbit.create(
      this.id,
      this.name,
      this.description,
      this.frequencyType,
      this.frequencyAmount,
      this.completionTime,
      this.restTime,
      this.userId,
      this.wearableId,
    );
  }

  static create(): Habbit {
    return new HabbitMother().build();
  }
}
