import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { User } from './user.entity';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() user: User) {
    return this.usersService.findOneById(user.id);
  }

  @Put('/me')
  @UseGuards(AuthGuard)
  updateCurrentUser(@CurrentUser() user: User, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(user.id, body);
  }
}
