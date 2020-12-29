import { Task } from './../tasks/task.entity';
import { TaskDetail } from './task-detail.entity';
import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

interface Description {
  description: string;
  content: string;
}
@EntityRepository(TaskDetail)
export class TaskDetailRepository extends Repository<TaskDetail> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  async createTaskDetail(data: Description, task: Task): Promise<TaskDetail> {
    const { description, content } = data;
    const taskDetail = new TaskDetail();
    taskDetail.description = description;
    taskDetail.content = content;
    taskDetail.task = task;
    try {
      await taskDetail.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
    delete taskDetail.task;

    return taskDetail;
  }

  async deteleTaskDetail(id: number) {
    const query = this.createQueryBuilder('task_detail');
    query.where('taskId = :taskId', { taskId: id }).delete();
  }

  async getAllTaskDetail(id: number) {
    try {
      const query = this.createQueryBuilder('task_detail');
      query.where('task_detail.taskId = :taskId', { taskId: id });
      const taskDetails = await query
        .where('task_detail.taskId = :taskId', { taskId: id })
        .getMany();
      return taskDetails;
    } catch (error) {
      console.log(error);
    }
  }
}
