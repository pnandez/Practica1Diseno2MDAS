import { UserAchievement } from './userAchievement';

export class User {
  private achievements: UserAchievement[] = [];

  constructor(
    readonly id: string,
    readonly username: string,
    readonly fullname: string,
  ) {}

  addNewAchievement(challengeId: string, date: number) {
    this.achievements.push(UserAchievement.create(challengeId, date));
  }

  get lastAchievement() {
    return this.achievements.at(-1);
  }
}
