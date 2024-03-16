import { v4 as uuid4 } from 'uuid';

export abstract class BaseEvent<T> {
  readonly id: string = uuid4();

  protected constructor(
    readonly aggregateRootId: string,
    readonly timestamp: number,
    readonly type: string,
    readonly payload: T,
  ) {}
}
