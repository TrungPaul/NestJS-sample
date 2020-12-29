import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { TaskDetailModule } from './task-detail/task-detail.module';
import { TasksUserModule } from './tasks-user/tasks-user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule, AuthModule, TaskDetailModule, TasksUserModule],
})
export class AppModule {}
