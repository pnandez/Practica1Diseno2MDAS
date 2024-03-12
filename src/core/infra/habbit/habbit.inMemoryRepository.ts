import { HabbitNotFoundError } from '../../domain/habbit/error/habbitNotfFound.Error';
import { Habbit } from '../../domain/habbit/habbit';
import { HabbitRepository } from '../../domain/habbit/habbit.repository';
import { HabbitName } from '../../domain/habbit/habbitName';
import { HabbitUserId } from '../../domain/habbit/habbitUserId';

export class HabbitInMemoryRepository implements HabbitRepository {
  private habbits: Habbit[] = [];

  save(user: Habbit): void {
    this.habbits.push(user);
  }

  findByName(name: string): Habbit | undefined {
    return this.habbits.find((habbit) =>
      habbit.name.equals(HabbitName.create(name)),
    );
  }

  findById(id: string): Habbit {
    return this.habbits.find((habbit) => habbit.id.equals(id));
  }

  findByIdOrException(id: string): Habbit {
    const habbit = this.habbits.find((habbit) => habbit.id.equals(id));

    if (!habbit) {
      throw HabbitNotFoundError.withHabbitId(id);
    }

    return habbit;
  }

  findAllByUserId(userId: string): Habbit[] {
    return this.habbits.filter((habbit) =>
      habbit.userId.equals(HabbitUserId.create(userId)),
    );
  }

  exists(id: string): boolean {
    return this.habbits.some((h) => h.id.equals(id));
  }

  withHabbits(habbits: Habbit[]) {
    this.habbits = habbits;
  }

  isHabbitSaved(habbit: Habbit): boolean {
    return this.habbits.some((h) => h.id.equals(habbit.id));
  }
}
