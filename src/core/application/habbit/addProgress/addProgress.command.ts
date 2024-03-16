export class AddProgressCommand {
  constructor(
    readonly habbitId: string,
    readonly date?: number,
    readonly observations?: string,
  ) {}
}
