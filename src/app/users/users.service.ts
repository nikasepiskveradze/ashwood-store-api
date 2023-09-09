import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findOne() {
    console.log('find one user');
  }

  findOneById(id: number) {
    return this.repo.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  createUser({ name, email, password, birthday }) {
    const user = this.repo.create({ name, email, password, birthday });
    return this.repo.save(user);
  }
}
