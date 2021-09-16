import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {

@IsString()
@MinLength(4)
@MaxLength(20)
username:string;

@IsString()
@MinLength(5)
@MaxLength(20)
//@Matches(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"))
password:string;

}