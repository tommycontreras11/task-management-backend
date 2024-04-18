import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateListDTO {    
    @IsUUID('4')
    @IsNotEmpty()
    @Expose()
    boardUUID: string
    
    @IsNotEmpty()
    @IsString()
    @Expose()
    title: string
}

export class UpdateListDTO {    
    @IsUUID('4')
    @IsNotEmpty()
    @Expose()
    boardUUID: string
    
    @IsOptional()
    @IsString()
    @Expose()
    title: string
}