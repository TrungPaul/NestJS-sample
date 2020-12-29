import { User } from './../auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from 'src/tasks/task.entity';

@Entity()
export class TaskUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  taskId: number;

  @ManyToOne((type) => Task, (task) => task.taskUsers)
  task: Task;

  @ManyToOne((type) => User, (user) => user.taskUsers)
  user: User[];
}
