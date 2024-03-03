export class RegisterUserCommand {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly fullname: string,
  ) {}
}
