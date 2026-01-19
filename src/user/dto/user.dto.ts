import {
  IsEmail,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsDefined({ message: 'email is required' })
  @IsNotEmpty({ message: 'email should not be empty' })
  email: string;

  @IsString({ message: 'username must be a string' })
  @IsDefined({ message: 'username is required' })
  @IsNotEmpty({ message: 'username should not be empty' })
  username: string;

  @IsString({ message: 'password must be a string' })
  @IsDefined({ message: 'password is required' })
  @IsNotEmpty({ message: 'password should not be empty' })
  password: string;

  @IsString({ message: 'role_id must be a string' })
  @IsDefined({ message: 'role_id is required' })
  @IsNotEmpty({ message: 'role_id should not be empty' })
  role_id: string;
}

export class UpdateUserDto {
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'username must be a string' })
  @IsOptional()
  username?: string;

  @IsString({ message: 'role_id must be a string' })
  @IsOptional()
  role_id?: string;
}

export class ChangePasswordDto {
  @IsString({ message: 'password must be a string' })
  @IsDefined({ message: 'password is required' })
  @IsNotEmpty({ message: 'password should not be empty' })
  password: string;
}
