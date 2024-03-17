import { v4 as uuidv4 } from 'uuid';
import { Challenge } from '../../domain/challenge/challenge';

export class ChallengeMother {
  private id: string = uuidv4();
  private habbitId: string = 'habbitId';
  private description: string = 'description';
  private numberOfTimesToRepeatHabbit: number = 1;
  private startDate: number = Date.now() - 1000;
  private limitDate: number = Date.now();
  private status: string;

  withId(id: string) {
    this.id = id;
    return this;
  }

  withHabbitId(habbitId: string) {
    this.habbitId = habbitId;
    return this;
  }

  withDescription(description: string) {
    this.description = description;
    return this;
  }

  withNumberOfTimesToRepeatHabbit(numberOfTimesToRepeat: number) {
    this.numberOfTimesToRepeatHabbit = numberOfTimesToRepeat;
    return this;
  }

  withStartDate(startDate: number) {
    this.startDate = startDate;
    return this;
  }

  withLimitDate(limitDate: number) {
    this.limitDate = limitDate;
    return this;
  }

  withStatus(status: string) {
    this.status = status;
    return this;
  }

  build(): Challenge {
    return Challenge.create(
      this.id,
      this.habbitId,
      this.description,
      this.numberOfTimesToRepeatHabbit,
      this.startDate,
      this.limitDate,
      this.status,
    );
  }

  static create(): Challenge {
    return new ChallengeMother().build();
  }
}
