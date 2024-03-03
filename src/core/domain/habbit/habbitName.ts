export class HabbitName {
  private constructor(private readonly name: string) {}

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
