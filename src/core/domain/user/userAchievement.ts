export class UserAchievement {
  private constructor(
    readonly challengeId: string,
    readonly date: number,
  ) {}

  static create(challengeId: string, date: number) {
    return new UserAchievement(challengeId, date);
  }
}
