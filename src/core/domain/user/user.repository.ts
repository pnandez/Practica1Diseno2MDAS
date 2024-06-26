import { User } from './user';

export interface UserRepository {
  save(user: User): void;
  update(user: User): void;
  findById(id: string): User | undefined;
  findByUsername(username: string): User | undefined;
}

export const UserRepository = Symbol('UserRepository');
