export class ChallengeCompletedEventPayload {
  constructor(
    readonly challengeId: string,
    readonly userId: string,
    readonly date: number,
  ) {}
}
