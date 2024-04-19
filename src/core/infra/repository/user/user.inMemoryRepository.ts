import { User } from '@core/domain/user/user';
import { UserRepository } from '@core/domain/user/user.repository';

export class UserInMemoryRepository implements UserRepository {
  private users: User[] = [];

  save(user: User): void {
    this.users.push(user);
  }

  update(user: User): void {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = user;
  }

  findByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  withUsers(users: User[]) {
    this.users = users;
  }

  isUserSaved(user: User): boolean {
    return this.users.some((u) => u.id === user.id);
  }
}
