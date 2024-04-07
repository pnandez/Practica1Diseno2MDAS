import { CoreQueryService } from 'social/domain/shared/core.service';

export class CoreMock implements CoreQueryService {
  private habbits: string[] = [];
  private users: string[] = [];

  addHabbitId(habbitId: string): void {
    this.habbits.push(habbitId);
  }

  addUserId(userId: string): void {
    this.users.push(userId);
  }

  existsHabbit(habbitId: string): boolean {
    return this.habbits.includes(habbitId);
  }

  existsUser(userId: string): boolean {
    return this.users.includes(userId);
  }
}
