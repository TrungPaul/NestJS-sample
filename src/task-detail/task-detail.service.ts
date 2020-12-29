import { User } from './../auth/user.entity';
import { TaskDetail } from './task-detail.entity';
import { Task } from './../../dist/tasks/tasks.model .d';
import { CreateTaskDetailDto } from './dto/create-taskDetail.dto';
import { TaskDetailRepository } from './task-detail.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskDetailService {
  constructor(
    @InjectRepository(TaskDetailRepository)
    private taskDetailRepository: TaskDetailRepository,
  ) {}
  async createTaskDeatail(
    createTaskDetailDto: CreateTaskDetailDto,
    task: Task,
  ) {
    console.log(task);
    // return this.taskDetailRepository.createTaskDetail(
    //   createTaskDetailDto,
    //   task,
    // );
  }
}
