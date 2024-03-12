import { InvalidProgressRecord } from './error/invalidProgressRecord.error';

export class HabbitProgressRecord {
  private constructor(
    readonly date: Date,
    readonly observations: string,
    readonly validated: boolean,
  ) {}

  static create(
    date: number,
    observations: string,
    validated: boolean = false,
  ): HabbitProgressRecord {
    if (!date) {
      throw InvalidProgressRecord.withIncompleteDataIntroduced('date');
    }
    const parsedDate = new Date(date);
    if (parsedDate.getTime() > new Date().getTime()) {
      throw InvalidProgressRecord.withDateInFuture(parsedDate.toISOString());
    }
    return new HabbitProgressRecord(new Date(date), observations, validated);
  }

  toPrimitives(): { date: number; observations: string } {
    return {
      date: this.date.valueOf(),
      observations: this.observations,
    };
  }
}
