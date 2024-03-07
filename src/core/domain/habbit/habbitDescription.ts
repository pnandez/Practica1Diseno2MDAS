import { InvalidHabbitDataError } from './error/incompleteHabbitData.error';
import { RequiredHabbitAttribute } from './requiredHabbitAttribute';

export class HabbitDescription extends RequiredHabbitAttribute {
  private constructor(readonly description: string) {
    super();
    if (this.isNullOrUndefined(description)) {
      throw InvalidHabbitDataError.withAttribute('description');
    }
  }

  public static create(description: string): HabbitDescription {
    return new HabbitDescription(description);
  }

  public toPrimitives() {
    return this.description;
  }
}
