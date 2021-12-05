import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HelperModule } from './helper/helper.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, TaskModule, HelperModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
