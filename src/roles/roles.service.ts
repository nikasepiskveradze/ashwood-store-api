import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { AssignRoleUserDto } from './dtos/assign-role-user.dto';
import { User } from '../users/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.roleRepository.find();
  }

  create(roleName: string) {
    const role = this.roleRepository.create({ role: roleName });
    return this.roleRepository.save(role);
  }

  async assign(assignDto: AssignRoleUserDto) {
    const role = await this.roleRepository.findOneBy({ id: assignDto.roleId });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: assignDto.userId },
      relations: { roles: true },
    });
    if (!user) {
      throw new NotFoundException("User not found, can't assign a role");
    }

    if (user.roles.map((role) => role.id).includes(role.id)) {
      return user;
    }

    user.roles = [...user.roles, role];
    return this.userRepository.save(user);
  }
}
