import { AuthModule } from './../auth/auth.module';
import { TaskDetailRepository } from './task-detail.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TaskDetailController } from './task-detail.controller';
import { TaskDetailService } from './task-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskDetailRepository]), AuthModule],
  controllers: [TaskDetailController],
  providers: [TaskDetailService],
})
export class TaskDetailModule {}
