import { TaskUserRepository } from './task-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksUserController } from './tasks-user.controller';
import { TasksUserService } from './tasks-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskUserRepository])],
  controllers: [TasksUserController],
  providers: [TasksUserService],
})
export class TasksUserModule {}
