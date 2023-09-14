import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupUserDto } from './dtos/signup-user.dto';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(userDto: SignupUserDto) {
    const user = await this.usersService.findOneByEmail(userDto.email);
    if (user) {
      throw new BadRequestException('Email in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await promisify(scrypt)(
      userDto.password,
      salt,
      32,
    )) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const createdUser = await this.usersService.createUser({
      ...userDto,
      password: result,
    });

    return this.getAccessToken(createdUser);
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await promisify(scrypt)(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }

    return this.getAccessToken(user);
  }

  private async getAccessToken(user: User) {
    const payload = {
      sub: user.id,
      name: user.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
