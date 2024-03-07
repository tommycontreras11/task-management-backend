import { Expose } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateBoardDTO {
    @IsUUID('4')
    @IsNotEmpty()
    @Expose()
    workspaceUUID: string

    @IsUUID('4', { each: true })
    @IsArray()
    @IsNotEmpty()
    @Expose()
    userUUIDs: string[]

    @IsNotEmpty()
    @IsString()
    @Expose()
    title: string
}

export class UpdateBoardDTO {
    @IsUUID('4')
    @IsOptional()
    @Expose()
    workspaceUUID: string

    @IsUUID('4', { each: true })
    @IsOptional()
    @Expose()
    userUUIDs: string[]

    @IsOptional()
    @IsString()
    @Expose()
    title: string
}