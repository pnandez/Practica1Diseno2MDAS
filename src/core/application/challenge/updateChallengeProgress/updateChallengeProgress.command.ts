export class UpdateChallengeProgressCommand {
  constructor(
    readonly habbitId: string,
    readonly progressDate: number,
  ) {}
}
