import { InvalidHabbitDataError } from './error/incompleteHabbitData.error';
import { RequiredHabbitAttribute } from './requiredHabbitAttribute';

export class HabbitUserId extends RequiredHabbitAttribute {
  private constructor(readonly userId: string) {
    super();
    if (!this.isValid(userId)) {
      throw InvalidHabbitDataError.withAttribute('userId');
    }
  }

  public static create(userId: string): HabbitUserId {
    return new HabbitUserId(userId);
  }

  toPrimitives() {
    return this.userId;
  }
}
