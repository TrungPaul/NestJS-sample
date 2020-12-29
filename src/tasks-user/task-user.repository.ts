import { TaskUser } from './task-user.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(TaskUser)
export class TaskUserRepository extends Repository<TaskUser> {
  // async createTaskUser(taskId: number, userId: number): Promise<TaskUser> {
  //   const taskUser = new TaskUser();
  //   taskUser.taskId = taskId;
  //   taskUser.userId = userId;
  //   try {
  //     await taskUser.save();
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   return taskUser;
  // }

  async getAllTaskUser(id: number) {
    try {
      const query = this.createQueryBuilder('task_user');
      const taskDetails = await query.where('task_user.taskId = :taskId', {
        taskId: id,
      });
      query.leftJoinAndSelect('task_user.userId', 'taskUsers').getMany();
      return taskDetails;
    } catch (error) {
      console.log(error);
    }
  }
}
