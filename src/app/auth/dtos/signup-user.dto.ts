import { IsDateString, IsEmail, IsString } from 'class-validator';

export class SignupUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsDateString()
  birthday: Date;
}
