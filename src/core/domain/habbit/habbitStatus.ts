export class HabbitStatus {
  private constructor(readonly status: string) {}

  static available() {
    return new HabbitStatus('available');
  }

  static suspended() {
    return new HabbitStatus('suspended');
  }

  toPrimitive() {
    return this.status;
  }
}
