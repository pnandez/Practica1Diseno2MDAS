export class CreateReminderCommand {
  constructor(
    readonly id: string,
    readonly habbitId: string,
    readonly message: string,
    readonly isActive: boolean,
    readonly hourToNotify: number,
  ) {}
}
