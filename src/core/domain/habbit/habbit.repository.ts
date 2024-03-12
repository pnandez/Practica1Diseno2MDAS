import { Habbit } from './habbit';

export interface HabbitRepository {
  save(habbit: Habbit);

  findByName(name: string): Habbit;

  findById(id: string): Habbit;

  findAllByUserId(userId: string): Habbit[];
}
