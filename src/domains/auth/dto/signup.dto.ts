import { IsEmail, IsString, IsNotEmpty, MinLength } from "class-validator";

export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @MinLength(6)
    password!: string;

    @IsNotEmpty()
    avatar!: string;
}