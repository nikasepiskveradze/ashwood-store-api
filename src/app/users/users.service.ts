import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user-dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findOneById(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: { roles: true },
    });

    return user;
  }

  findOneByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  createUser({ name, lastname, email, password, birthday }) {
    const user = this.repo.create({
      name,
      lastname,
      email,
      password,
      birthday,
    });
    return this.repo.save(user);
  }

  async updateUser(id: number, userDto: UpdateUserDto) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, userDto);
    return this.repo.save(user);
  }
}
