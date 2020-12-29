import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { User } from './../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatetaskDto } from './dto/create-task.dto';
import {
  Delete,
  Patch,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreatetaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/delete')
  deleteManyTask(@Body('id') id: number[], @GetUser() user: User) {
    this.tasksService.deleteManytask(id, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: number, @GetUser() user: User): void {
    this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: number,
    @Body('status') status: TaskStatus,
    @GetUser() user: User,
  ) {
    return this.tasksService.updateStatusTask(id, status, user);
  }

  @Patch('/:id/choose')
  updateTaskUser(@Param('id') id: number, @GetUser() user: User) {
    return this.tasksService.updateTaskUser(id, user);
  }
}
