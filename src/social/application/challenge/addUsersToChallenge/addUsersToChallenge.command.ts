export class AddUsersToChallengeCommand {
  constructor(
    public readonly challengeId: string,
    public readonly userIds: string[],
  ) {}
}
