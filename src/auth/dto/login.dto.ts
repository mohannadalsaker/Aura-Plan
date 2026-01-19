import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsDefined({ message: 'email is required' })
  @IsNotEmpty({ message: 'email should not be empty' })
  email: string;

  @IsString({ message: 'password must be a string' })
  @IsDefined({ message: 'password is required' })
  @IsNotEmpty({ message: 'password should not be empty' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  password: string;
}
