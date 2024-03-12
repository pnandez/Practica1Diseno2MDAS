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
    readonly habbitDeviceId?: string,
    readonly habbitDeviceType?: number,
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
    habbitDeviceId?: string;
    habbitDeviceType?: number;
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
