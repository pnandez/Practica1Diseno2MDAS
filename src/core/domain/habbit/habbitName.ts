import { InvalidHabbitDataError } from './error/incompleteHabbitData.error';
import { RequiredHabbitAttribute } from './requiredHabbitAttribute';

export class HabbitName extends RequiredHabbitAttribute {
  private constructor(private readonly name: string) {
    super();    
    if (this.isNullOrUndefined(name)) {
      throw InvalidHabbitDataError.withAttribute('name');
    }
  }

  public static create(name: string): HabbitName {
    return new HabbitName(name);
  }

  public equals(other: HabbitName): boolean {
    return this.name === other.name;
  }

  toPrimitives() {
    return this.name;
  }
}
