import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation-pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasl-status.enum';

@Controller('tasks')
//@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) { }


    @Get()
    getTasks(@Query(ValidationPipe) filterDto:GetTaskFilterDto,
             @GetUser() user:User): Promise<Task[]> {
        this.logger.verbose(`User '${user.username}' retrieving all tasks. Filters :${JSON.stringify(filterDto)}`);
        return this.tasksService.getTasks(filterDto,user);          
    }

    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id: number,
    @GetUser() user:User): Promise<Task> {
        return this.tasksService.getTaskById(id,user);
    }

    @Delete('/:id')
    deleteTask(@Param('id',ParseIntPipe) id: number,
    @GetUser() user:User): void {
        this.tasksService.deleteTask(id,user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id',ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user:User): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status,user)
    }

     //with dto
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto,
               @GetUser() user: User): Promise<Task> {
        this.logger.verbose(`User '${user.username}' creating new task :${JSON.stringify(createTaskDto)}`);
        return this.tasksService.createTask(createTaskDto,user);
    }

}
