import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  async getComments(@Request() req) {
    return this.commentService.getAllComments({ role: req.user.role });
  }

  @Get(':taskId')
  async getCommentsByTaskId(@Request() req, @Param('taskId') taskId: string) {
    return this.commentService.getCommentsByTask({
      role: req.user.role,
      taskId,
      userId: req.user.id,
    });
  }

  @Post(':taskId')
  async createComment(
    @Request() req,
    @Body() body: CreateCommentDto,
    @Param('taskId') taskId: string,
  ) {
    return this.commentService.createComment({
      role: req.user.role,
      userId: req.user.id,
      body,
      taskId,
    });
  }

  @Delete(':id')
  async deleteComment(@Request() req, @Param('id') id: string) {
    return this.commentService.deleteComment({
      role: req.user.role,
      userId: req.user.id,
      id,
    });
  }
}
