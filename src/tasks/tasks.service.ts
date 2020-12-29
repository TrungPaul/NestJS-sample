import { TaskUserRepository } from './../tasks-user/task-user.repository';
import { TaskDetailRepository } from './../task-detail/task-detail.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from './../auth/user.entity';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { CreatetaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    @InjectRepository(TaskDetailRepository)
    @InjectRepository(TaskUserRepository)
    private taskRepository: TaskRepository,
    private taskDetailRepository: TaskDetailRepository,
    private taskUserRepository: TaskUserRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User) {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async createTask(createtaskDto: CreatetaskDto, user: User): Promise<Task> {
    try {
      const task = await this.taskRepository.createTask(createtaskDto, user);
      const { description } = createtaskDto;
      description.map(async (description) => {
        await this.taskDetailRepository.createTaskDetail(description, task);
      });
      return task;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, create_by: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    await this.taskDetailRepository.deteleTaskDetail(id);
  }

  async getTaskById(id: number, user: User): Promise<any> {
    const task = await this.taskRepository.find({
      where: { id, create_by: user.id },
      relations: ['taskDetails', 'taskUsers'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    // const taskDetails = await this.taskDetailRepository.getAllTaskDetail(id);
    // const taskDetails = await this.taskRepository.find({
    //   relations: ['taskDetails'],
    // });
    // const task = { ...found };
    return task;
  }

  async deleteManytask(id: number[], user: User): Promise<void> {
    id.map((id) => {
      this.deleteTask(id, user);
    });
  }

  async updateStatusTask(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    task.save();
    return task;
  }

  async updateTaskUser(id: number, user: User) {
    // return this.taskUserRepository.createTaskUser(id, user.id);
  }
}
