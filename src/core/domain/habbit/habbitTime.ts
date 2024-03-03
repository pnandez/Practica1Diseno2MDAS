export class HabbitTime {
  private constructor(
    private readonly completionTime: number,
    private readonly restTime: number,
  ) {}

  public static create(completionTime: number, restTime: number): HabbitTime {
    return new HabbitTime(completionTime, restTime);
  }

  public toPrimitives() {
    return {
      completionTime: this.completionTime,
      restTime: this.restTime,
    };
  }
}
