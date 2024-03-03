export class HabbitDescription {
  private constructor(readonly description: string) {}

  public static create(description: string): HabbitDescription {
    return new HabbitDescription(description);
  }

  public toPrimitives() {
    return this.description;
  }
}
