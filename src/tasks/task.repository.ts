import { InternalServerErrorException, Logger, Query } from "@nestjs/common";
import { filter } from "rxjs";
import { User } from "src/auth/user.entity";
import { EntityRepository, FilterQuery, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./tasl-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    private logger = new Logger('TaskRepository');
    async createTask(createTaskDto: CreateTaskDto,
                     user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.Open;
        task.user = user;
        await task.save();

        //delete task.user;
        return task;
    }

    async getTasks(filterDto: GetTaskFilterDto,
                    user:User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where('task.userId = : userId',{userId : user.id})
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(`Failed to get tasks for User '${user.username}' DTO :${JSON.stringify(filterDto)}`,error.stack);
            throw new InternalServerErrorException("");
            
        }
     
    }

}