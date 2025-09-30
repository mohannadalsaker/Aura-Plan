import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';
import { TaskService } from 'src/task/task.service';
import { UserRole } from 'src/user/types';
import { CreateCommentDto } from './dto/comment.dto';
import passport from 'passport';
import { PermissionService } from 'src/permission/permission.service';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private taskService: TaskService,
    private permissionService: PermissionService,
  ) {}

  async getAllComments({ role }: { role: string }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'READ_COMMENT',
    });
    const comments = await this.prisma.comment.findMany({
      include: {
        user: { omit: { password: true } },
        task: { select: { id: true, title: true } },
      },
    });
    return comments;
  }

  async getCommentsByTask({
    role,
    userId,
    taskId,
  }: {
    role: string;
    userId: string;
    taskId: string;
  }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'READ_COMMENT',
    });
    const task = await this.taskService.getTask({
      role,
      userId,
      taskId,
      withComments: true,
    });

    return task.comments;
  }

  async getComment({
    role,
    userId,
    commentId,
  }: {
    role: string;
    userId: string;
    commentId: string;
  }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'READ_COMMENT',
    });
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
        ...(role === 'ADMIN' ? {} : { user_id: userId }),
      },
      include: { user: { omit: { password: true } } },
    });

    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async createComment({
    role,
    userId,
    taskId,
    body,
  }: {
    role: string;
    userId: string;
    taskId: string;
    body: CreateCommentDto;
  }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'CREATE_COMMENT',
    });
    await this.taskService.getTask({ role, userId, taskId });
    await this.prisma.comment.create({
      data: {
        ...body,
        task: { connect: { id: taskId } },
        user: { connect: { id: userId } },
      },
    });
    return 'Comment created';
  }

  async deleteComment({
    role,
    userId,
    id,
  }: {
    role: string;
    userId: string;
    id: string;
  }) {
    await this.permissionService.hasPermission({
      role,
      permission: 'DELETE_COMMENT',
    });
    await this.getComment({ role, userId, commentId: id });

    await this.prisma.comment.delete({ where: { id } });
    return 'Comment deleted';
  }
}
