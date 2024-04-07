export class AddChallengeCommand {
  constructor(
    readonly challengeId: string,
    readonly habbitId: string,
    readonly target: number,
    readonly partner: string,
    readonly project: string,
    readonly cost: number,
    readonly deadline: Date,
    readonly userId: string,
  ) {}
}
