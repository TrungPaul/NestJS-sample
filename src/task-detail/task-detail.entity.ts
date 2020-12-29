import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class TaskDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  content: string;

  @ManyToOne((type) => Task, (task) => task.taskDetails, {
    onDelete: 'CASCADE',
  })
  task: Task;

  @Column()
  taskId: number;
  title: string;
}
