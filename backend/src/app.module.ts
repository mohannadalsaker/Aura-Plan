import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';
import { PermissionModule } from './permission/permission.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, RoleModule, ProjectModule, TaskModule, CommentModule, PermissionModule, AnalyticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
