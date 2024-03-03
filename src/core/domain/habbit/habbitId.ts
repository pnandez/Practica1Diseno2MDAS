export class HabbitId {
  private constructor(private readonly id: string) {}

  public static create(id: string): HabbitId {
    return new HabbitId(id);
  }

  public toPrimitives(): string {
    return this.id;
  }

  public equals(other: HabbitId | string): boolean {
    if (other instanceof HabbitId) {
      return this.id === other.id;
    }
    return this.id === other;
  }
}
