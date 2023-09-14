import { IsDateString, IsEmail, IsString } from 'class-validator';

export class SignupUserDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsDateString()
  birthday: Date;
}
