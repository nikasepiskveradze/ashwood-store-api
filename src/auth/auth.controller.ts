import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dtos/signup-user.dto';
import { SigninUserDto } from './dtos/signin-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: SignupUserDto) {
    return this.authService.signup(body);
  }

  @Post('/signin')
  signin(@Body() body: SigninUserDto) {
    return this.authService.signin(body.email, body.password);
  }
}
