export class CreateAchievementCommand {
  constructor(
    readonly challengeId: string,
    readonly userId: string,
    readonly date: number,
  ) {}
}
