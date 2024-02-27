import { Expose, Transform } from "class-transformer";
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxDate,
  Validate,
  ValidatorConstraint
} from "class-validator";
import { GenderType } from "../database/entities/entity/user-info.entity";
import { IsValidDTOGlobal } from "../middlewares/dto/validate-dto.class";

@ValidatorConstraint()
class IsValidDTO extends IsValidDTOGlobal { }

export class CreateUserInfoDTO {
  @IsNotEmpty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @MaxDate(new Date(), { message: "Birth date cannot be in the future" })
  @Expose()
  birthDate: Date;

  @IsOptional()
  @IsString()
  @Expose()
  phone: string;

  @IsOptional()
  @IsString()
  @Expose()
  mobile: string;

  @IsNotEmpty()
  @IsEnum({ MALE: "MALE", FEMALE: "FEMALE", OTHER: "OTHER" })
  @Expose()
  gender: GenderType;
}

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;

  @IsNotEmpty()
  @Validate(IsValidDTO, [CreateUserInfoDTO])
  @Expose()
  info: CreateUserInfoDTO;
}

export class UpdateUserDTO extends CreateUserDTO {
  @IsOptional()
  @IsString()
  @Expose()
  firstName: string;

  @IsOptional()
  @IsString()
  @Expose()
  lastName: string;

  @IsOptional()
  @IsString()
  @Expose()
  email: string;

  @IsOptional()
  @IsString()
  @Expose()
  password: string;

  @IsOptional()
  @Validate(IsValidDTO, [CreateUserInfoDTO])
  @Expose()
  info: CreateUserInfoDTO;
}