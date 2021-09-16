import {  BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tasl-status.enum";


export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowStatuses = [
        TaskStatus.Open,
        TaskStatus.InProgress,
        TaskStatus.Done
    ]

    transform(value: any) {
        if (!this.isStatusValid(value)) {
            throw new BadRequestException('"{$value}" is an invalid status');            
        }

        return value;
    }

    private isStatusValid(status : any){
         const idx = this.allowStatuses.indexOf(status);
         return idx !== -1;
    }
}