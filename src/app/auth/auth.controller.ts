import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dtos/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: SignupUserDto) {
    return this.authService.signup(body);
  }
}
