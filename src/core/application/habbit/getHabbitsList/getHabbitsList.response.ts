import { Habbit } from '../../../domain/habbit/habbit';

export class GetHabbitsListResponse {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly frequencyType: string,
    readonly frequencyAmount: number,
    readonly completionTime: number,
    readonly restTime: number,
    readonly userId: string,
  ) {}

  static fromHabbit(habbit: Habbit): GetHabbitsListResponse {
    const primitives = habbit.toPrimitives();
    return new GetHabbitsListResponse(
      primitives.id,
      primitives.name,
      primitives.description,
      primitives.frequencyType,
      primitives.frequencyAmount,
      primitives.completionTime,
      primitives.restTime,
      primitives.userId,
    );
  }
}
