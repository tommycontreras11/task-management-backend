import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateWorkspaceDTO {
  @IsUUID("4")
  @IsNotEmpty()
  @Expose()
  userUUID: string;

  @IsUUID("4")
  @IsNotEmpty()
  @Expose()
  typeUUID: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsOptional()
  @IsString()
  @Expose()
  description: string;
}

export class UpdateWorkspaceDTO {
  @IsUUID("4")
  @IsOptional()
  @Expose()
  typeUUID: string;

  @IsOptional()
  @IsString()
  @Expose()
  name: string;

  @IsOptional()
  @IsString()
  @Expose()
  description: string;
}
