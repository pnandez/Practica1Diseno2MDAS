import { Habbit } from './habbit';

export interface HabbitRepository {
  save(habbit: Habbit);

  findByName(name: string): Habbit;

  findById(id: string): Habbit;

  findByIdOrException(id: string): Habbit;

  findAllByUserId(userId: string): Habbit[];

  exists(id: string): boolean;
}
