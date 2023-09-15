import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { AssignRoleUserDto } from './dtos/assign-role-user.dto';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { Roles } from '../../decorators/roles.decoractor';
import { Role } from '../../enums/role.enum';
import { RolesGuard } from '../../guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@UseGuards(AuthGuard, RolesGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles(Role.Admin)
  getAllRoles() {
    return this.rolesService.findAll();
  }

  @Post()
  @Roles(Role.Admin)
  createRole(@Body() body: CreateRoleDto) {
    return this.rolesService.create(body.role);
  }

  @Post('/assign')
  @Serialize(UserDto)
  @Roles(Role.Admin)
  assignRoleToUser(@Body() body: AssignRoleUserDto) {
    return this.rolesService.assign(body);
  }
}
