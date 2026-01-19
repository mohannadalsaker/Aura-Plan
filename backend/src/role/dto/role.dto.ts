import { Permissions } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsDefined({ message: 'name is required' })
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @IsArray({ message: 'permissions must be an array' })
  @IsDefined({ message: 'permissions are required' })
  @IsEnum(Permissions, {
    each: true,
    message: 'each permission must be a valid Permissions enum value',
  })
  permissions: Permissions[];
}

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsArray({ message: 'permissions must be an array' })
  @IsEnum(Permissions, {
    each: true,
    message: 'each permission must be a valid Permissions enum value',
  })
  @IsOptional()
  permissions?: Permissions[];
}
