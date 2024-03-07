export abstract class RequiredHabbitAttribute {
  isNullOrUndefined(value: any): boolean {
    return value === undefined || value === null;
  }
}
