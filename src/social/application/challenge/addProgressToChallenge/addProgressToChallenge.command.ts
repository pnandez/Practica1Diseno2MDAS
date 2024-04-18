export class AddProgressToChallengeCommand {
  constructor(
    readonly habbitId: string,
    readonly progress: number,
  ) {}
}
