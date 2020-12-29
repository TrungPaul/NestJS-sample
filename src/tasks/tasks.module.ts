import { TaskUserRepository } from './../tasks-user/task-user.repository';
import { TaskDetailRepository } from './../task-detail/task-detail.repository';
import { AuthModule } from './../auth/auth.module';
import { TaskRepository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskRepository,
      TaskDetailRepository,
      TaskUserRepository,
    ]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
