import { TaskStatus } from './../task-status.enum';
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROCESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCse();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(` ${value} is invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
