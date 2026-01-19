import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString({ message: 'text must be a string' })
  @IsDefined({ message: 'text is required' })
  @IsNotEmpty({ message: 'text should not be empty' })
  text: string;
}
