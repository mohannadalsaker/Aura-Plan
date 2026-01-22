import { TaskStatus } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsDefined({ message: 'title is required' })
  @IsNotEmpty({ message: 'title should not be empty' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsDefined({ message: 'start_date is required' })
  @IsNotEmpty({ message: 'start_date should not be empty' })
  start_date: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;

  @IsArray()
  @IsDefined({ message: 'users are required' })
  @IsUUID(undefined, { each: true, message: 'each user must be a valid UUID' })
  users: string[];

  @IsUUID()
  @IsDefined({ message: 'project_id is required' })
  @IsNotEmpty({ message: 'project_id should not be empty' })
  project_id: string;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;

  @IsArray()
  @IsUUID(undefined, { each: true, message: 'each user must be a valid UUID' })
  @IsOptional()
  users?: string[];

  @IsUUID()
  @IsOptional()
  project_id?: string;
}

export class ChangeTaskStatusDto {
  @IsEnum(TaskStatus, {
    message: 'status must be a valid TaskStatus enum value',
  })
  @IsDefined({ message: 'status is required' })
  @IsNotEmpty({ message: 'status should not be empty' })
  status: TaskStatus;
}

export class RateTaskDto {
  @IsDefined({ message: 'rating is required' })
  @IsNotEmpty({ message: 'rating should not be empty' })
  rating: number;
}
