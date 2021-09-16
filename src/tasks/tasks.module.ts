import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  //DI
  imports:[
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule
  ],
  //End DI
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
