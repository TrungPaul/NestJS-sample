import { TaskStatus } from './task-status.enum';
import { CreatetaskDto } from './dto/create-task.dto';
import { User } from './../auth/user.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query
      .select(['task.id', 'task.status'])
      .where('task.create_by = :create_by', { create_by: user.id });
    if (status) {
      query.andWhere('task.status= :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    query
      .leftJoin('task.taskUsers', 'taskUsers')
      .addSelect(['taskUsers.userId', 'taskUsers.taskId'])
      .leftJoin('taskUsers.user', 'user')
      .addSelect(['user.id', 'user.username']);

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createtaskDto: CreatetaskDto, user: User): Promise<Task> {
    const { title } = createtaskDto;

    const task = new Task();
    task.title = title;
    task.description = 'sss';
    task.status = TaskStatus.OPEN;
    task.create_by = user.id;
    try {
      await task.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return task;
  }

  async addUserChooseTask(id: number, user: User) {
    const query = this.createQueryBuilder('task');
    query.relation(Task, 'tasks').of(Task).add(user.id);
  }
}
