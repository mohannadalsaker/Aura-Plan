import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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
  async getComments(@Request() req, @Query() query) {
    return this.commentService.getAllComments({
      role: req.user.role,
      ...query,
    });
  }

  @Get('task/:taskId')
  async getCommentsByTaskId(@Request() req, @Param('taskId') taskId: string) {
    return this.commentService.getCommentsByTask({
      role: req.user.role,
      taskId,
      userId: req.user.id,
    });
  }

  @Post('task/:taskId')
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
