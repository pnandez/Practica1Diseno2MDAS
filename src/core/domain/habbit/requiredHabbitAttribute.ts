export abstract class RequiredHabbitAttribute {
  isValid(value: any): boolean {
    return value !== undefined && value !== null;
  }
}
