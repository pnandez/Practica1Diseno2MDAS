import { Habbit } from './habbit';

export interface HabbitRepository {
  save(habbit: Habbit);
}
