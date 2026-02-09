import { Injectable, NotFoundException } from '@nestjs/common';
import { PermissionService } from 'src/permission/permission.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskService } from 'src/task/task.service';
import { CreateCommentDto } from './dto/comment.dto';
import { PaginationParams } from 'src/shared/types';
import { buildPaginatedResponse } from 'src/shared/utils';
import { Permissions } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private taskService: TaskService,
    private permissionService: PermissionService,
  ) {}

  async getAllComments({
    permissions,
    pageNumber,
    pageSize,
    q = '',
  }: Partial<PaginationParams> & { permissions: Permissions[] }) {
    this.permissionService.assert({
      permissions,
      permission: 'READ_ALL_COMMENTS',
    });

    const filterQuery = {
      ...(pageNumber ? { skip: (+pageNumber - 1) * +(pageSize || 10) } : {}),
      ...(pageSize ? { take: +pageSize } : {}),
      where: {
        text: {
          contains: q,
          mode: 'insensitive' as const,
        },
      },
    };

    const comments = await this.prisma.comment.findMany({
      include: {
        user: { omit: { password: true } },
        task: { select: { id: true, title: true } },
      },
      ...filterQuery,
    });

    const total = await this.prisma.comment.count({
      where: { ...filterQuery.where },
    });

    return buildPaginatedResponse({
      data: comments,
      total,
      pageNumber,
      pageSize,
    });
  }

  async getCommentsByTask({
    permissions,
    userId,
    taskId,
  }: {
    permissions: Permissions[];
    userId: string;
    taskId: string;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'READ_COMMENT',
    });
    const task = await this.taskService.getTask({
      permissions,
      userId,
      taskId,
      withComments: true,
    });

    return task.comments;
  }

  async getComment({
    permissions,
    userId,
    commentId,
  }: {
    permissions: Permissions[];
    userId: string;
    commentId: string;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'READ_COMMENT',
    });
    const canReadComments = this.permissionService.has({
      permissions,
      permission: 'READ_ALL_COMMENTS',
    });
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
        ...(canReadComments ? {} : { user_id: userId }),
      },
      include: { user: { omit: { password: true } } },
    });

    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async createComment({
    permissions,
    userId,
    taskId,
    body,
  }: {
    permissions: Permissions[];
    userId: string;
    taskId: string;
    body: CreateCommentDto;
  }) {
    this.permissionService.assert({
      permissions,
      permission: 'CREATE_COMMENT',
    });
    await this.taskService.getTask({ permissions, userId, taskId });
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
    permissions,
    userId,
    id,
  }: {
    permissions: Permissions[];
    userId: string;
    id: string;
  }) {
    await this.permissionService.assert({
      permissions,
      permission: 'DELETE_COMMENT',
    });
    await this.getComment({ permissions, userId, commentId: id });

    await this.prisma.comment.delete({ where: { id } });
    return 'Comment deleted';
  }
}
