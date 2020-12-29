import { TaskUser } from './../tasks-user/task-user.entity';
import { TaskDetail } from './../task-detail/task-detail.entity';
import { User } from './../auth/user.entity';
import { TaskStatus } from './task-status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // @ManyToMany((type) => User, (user) => user.tasks, { cascade: true })
  // @JoinTable()
  // users: User[];

  @Column()
  create_by: number;

  @OneToMany(() => TaskDetail, (taskDeatail) => taskDeatail.task, {
    cascade: true,
    eager: true,
  })
  taskDetails: TaskDetail[];

  @OneToMany(() => TaskUser, (taskUser) => taskUser.task, {
    eager: true,
  })
  taskUsers: TaskUser[];
}
