import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProjectModule } from 'src/project/project.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [forwardRef(() => ProjectModule), forwardRef(() => TaskModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
