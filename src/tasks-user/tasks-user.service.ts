import { TaskUserRepository } from './task-user.repository';
import { TaskDetailRepository } from './../task-detail/task-detail.repository';
import { TaskUser } from './task-user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksUserService {
  constructor(
    @InjectRepository(TaskUserRepository)
    private taskRepository: TaskUserRepository,
  ) {}
  async createTaskUser(taskId: number, userId: number): Promise<TaskUser> {
    const task = new TaskUser();
    task.taskId = taskId;
    task.userId = userId;
    try {
      await task.save();
    } catch (error) {
      console.log(error);
    }

    return task;
  }
}
