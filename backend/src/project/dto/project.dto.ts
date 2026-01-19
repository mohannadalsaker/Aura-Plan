import { ProjectStatus } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProjectDto {
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

  @IsEnum(ProjectStatus, {
    message: 'status must be a valid ProjectStatus enum value',
  })
  @IsDefined({ message: 'status is required' })
  @IsNotEmpty({ message: 'status should not be empty' })
  status: ProjectStatus;

  @IsUUID()
  @IsDefined({ message: 'manager_id is required' })
  @IsNotEmpty({ message: 'manager_id should not be empty' })
  manager_id: string;

  @IsArray({ message: 'members must be an array' })
  @IsDefined({ message: 'members are required' })
  @IsUUID(undefined, {
    each: true,
    message: 'each member must be a valid UUID',
  })
  members: string[];
}

export class UpdateProjectDto {
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

  @IsEnum(ProjectStatus, {
    message: 'status must be a valid ProjectStatus enum value',
  })
  @IsOptional()
  status?: ProjectStatus;

  @IsUUID()
  @IsOptional()
  manager_id?: string;

  @IsArray({ message: 'members must be an array' })
  @IsUUID(undefined, {
    each: true,
    message: 'each member must be a valid UUID',
  })
  @IsOptional()
  members?: string[];
}

export class ChangeProjectStatusDto {
  @IsEnum(ProjectStatus, {
    message: 'status must be a valid ProjectStatus enum value',
  })
  @IsDefined({ message: 'status is required' })
  @IsNotEmpty({ message: 'status should not be empty' })
  status: ProjectStatus;
}
