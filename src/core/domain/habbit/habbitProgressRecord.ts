import { InvalidProgressRecord } from './error/invalidProgressRecord.error';
import { RequiredHabbitAttribute } from './requiredHabbitAttribute';

export class HabbitProgressRecord extends RequiredHabbitAttribute {
  private constructor(
    readonly date: Date,
    readonly observations: string,
  ) {
    super();
    if (this.isNullOrUndefined(date)) {
      throw InvalidProgressRecord.withIncompleteDataIntroduced('date');
    }
  }

  static create(date: number, observations: string): HabbitProgressRecord {
    const parsedDate = new Date(date);
    if (parsedDate.getTime() > new Date().getTime()) {
      throw InvalidProgressRecord.withDateInFuture(parsedDate.toISOString());
    }
    return new HabbitProgressRecord(new Date(date), observations);
  }

  toPrimitives(): { date: number; observations: string } {
    return {
      date: this.date.valueOf(),
      observations: this.observations,
    };
  }
}
