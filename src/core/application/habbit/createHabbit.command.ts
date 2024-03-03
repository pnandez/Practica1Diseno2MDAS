export class CreateHabbitCommand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly frequencyType: string,
    readonly frequencyAmount: number,
    readonly completionTime: number,
    readonly restTime: number,
    readonly userId: string,
  ) {}

  public static fromObject(params: {
    id: string;
    name: string;
    description: string;
    frequencyType: string;
    frequencyAmount: number;
    completionTime: number;
    restTime: number;
    userId: string;
  }) {
    return new CreateHabbitCommand(
      params.id,
      params.name,
      params.description,
      params.frequencyType,
      params.frequencyAmount,
      params.completionTime,
      params.restTime,
      params.userId,
    );
  }
}
