export class CreateChallengeCommand {
  constructor(
    readonly id: string,
    readonly habbitId: string,
    readonly description: string,
    readonly timesToRepeatHabbit: number,
    readonly startDate: number,
    readonly limitDate: number,
  ) {}
}
