import { InvalidHabbitDataError } from './error/incompleteHabbitData.error';
import { RequiredHabbitAttribute } from './requiredHabbitAttribute';

export class HabbitUserId extends RequiredHabbitAttribute {
  private constructor(readonly userId: string) {
    super();
    if (this.isNullOrUndefined(userId)) {
      throw InvalidHabbitDataError.withAttribute('userId');
    }
  }

  public static create(userId: string): HabbitUserId {
    return new HabbitUserId(userId);
  }

  equals(other: HabbitUserId): boolean {
    return this.userId === other.userId;
  }

  toPrimitives() {
    return this.userId;
  }
}
