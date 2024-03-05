import { Expose, Transform } from "class-transformer"
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MinDate } from "class-validator"
import { PriorityTaskStatus, PriorityTaskStatusType } from "../database/entities/entity/task.entity"

export class CreateTaskDTO {
    @IsNotEmpty()
    @IsString()
    @Expose()
    title: string

    @IsOptional()
    @IsString()
    @Expose()
    description: string

    @IsOptional()
    @IsEnum(PriorityTaskStatus)
    @Expose()
    priority: PriorityTaskStatusType

    @IsNotEmpty()
    @Transform(({ value }) => value && new Date(value))
    @IsDate()
    @MinDate(() => new Date(), { message: 'Due date cannot be in the past' })
    @Expose()
    dueDate: Date
}

export class UpdateTaskDTO {
    @IsOptional()
    @IsString()
    @Expose()
    title: string

    @IsOptional()
    @IsString()
    @Expose()
    description: string

    @IsOptional()
    @IsEnum(PriorityTaskStatus)
    @Expose()
    priority: PriorityTaskStatusType

    @IsOptional()
    @Transform(({ value }) => value && new Date(value))
    @IsDate()
    @MinDate(() => new Date(), { message: 'Due date cannot be in the past' })
    @Expose()
    dueDate: Date
}