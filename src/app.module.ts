import { Module } from '@nestjs/common';
import { RegisterUserCommandHandler } from './core/application/user/registerUser/registerUser.commandHandler';
import { UserRepository } from './core/domain/user/user.repository';
import { UserInMemoryRepository } from './core/infra/repository/user/user.inMemoryRepository';
import { CreateUserController } from './core/ui/server/createUser.controller';

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [
    RegisterUserCommandHandler,
    { provide: UserRepository, useClass: UserInMemoryRepository },
  ],
})
export class AppModule {}
