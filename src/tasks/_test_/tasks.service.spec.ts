import { GetTasksFilterDto } from './../dto/get-tasks-filter.dto';
import { TaskRepository } from './../task.repository';
import { TasksService } from './../tasks.service';
import { Test } from '@nestjs/testing';
import { TaskStatus } from '../task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 1, username: 'Test user' };

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
  deleteTask: jest.fn(),
});

describe('TaskService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const filters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROCESS,
        search: 'Some search query',
      };
      const result = await tasksService.getTasks(filters, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
  describe('get Task by ID', () => {
    it('gets all task by id from the repository', async () => {
      const mockTask = {
        title: 'getTask',
        description: 'test desc',
      };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(1, mockUser);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1, userId: mockUser.id },
      });
    });
  });

  describe('create task', () => {
    it('create task', async () => {
      const mockTask = {
        title: 'getTask',
        description: 'test desc',
      };
      taskRepository.createTask.mockResolvedValue('sometasks');
      const result = await tasksService.createTask(mockTask, mockUser);

      // expect(result).toEqual('sometasks');
      expect(taskRepository.createTask).toHaveBeenCalledWith(
        mockTask,
        mockUser,
      );
      expect(taskRepository.createTask).toHaveBeenCalled();
    });
  });

  describe('delete task', () => {
    it('delete task', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toHaveBeenCalled();

      await tasksService.deleteTask(1, mockUser);
      expect(taskRepository.delete).toHaveBeenCalledWith({
        id: 1,
        userId: mockUser.id,
      });
    });

    it('throw an error as task', () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 });
      expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update task status', () => {
    it('update task', async () => {
      const save = jest.fn().mockResolvedValue(true);
      tasksService.getTaskById = jest.fn().mockResolvedValue({
        status: TaskStatus.OPEN,
        save,
      });

      const result = await tasksService.updateStatusTask(
        1,
        TaskStatus.DONE,
        mockUser,
      );
      expect(save).toHaveBeenCalled();
      expect(result.status).toEqual(TaskStatus.DONE);
    });
  });
});
