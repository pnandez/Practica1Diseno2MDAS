import { ReadModel } from 'social/domain/shared/readModel';
import { UserChallenge } from './userHistory';
import { BaseEvent } from 'social/domain/shared/baseEvent';
export interface UserHistoryReadModel extends ReadModel {
  of(userId: string): UserChallenge[];
  apply(event: BaseEvent<any>): void;
}
