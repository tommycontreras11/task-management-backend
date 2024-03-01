import { Expose } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignInDTO {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @Expose()
    email: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    password: string
}