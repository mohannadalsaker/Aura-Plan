import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { ProjectModule } from 'src/project/project.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [ProjectModule, TaskModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
