import { IsIn, IsOptional } from "class-validator";
import { TaskStatus } from "../tasl-status.enum";

export class GetTaskFilterDto{

    @IsOptional()
    @IsIn([TaskStatus.Open,TaskStatus.InProgress,TaskStatus.Done])
    status : TaskStatus;

    @IsOptional()
    search : string;
}