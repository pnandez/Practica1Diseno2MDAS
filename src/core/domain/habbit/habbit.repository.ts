import { Habbit } from './habbit';

export interface HabbitRepository {
  save(habbit: Habbit);

  findByName(name: string): Habbit | undefined;

  findById(id: string): Habbit | undefined;

  findByIdOrException(id: string): Habbit;

  findAllByUserId(userId: string): Habbit[];

  exists(id: string): boolean;
}
