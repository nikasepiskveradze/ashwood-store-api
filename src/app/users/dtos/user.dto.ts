import { Expose, Transform } from 'class-transformer';
import { Role } from '../../roles/role.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  lastname: string;

  @Expose()
  email: string;

  @Expose()
  birthday: string;

  @Expose()
  balance: number;

  @Transform(({ obj }) => obj.roles)
  @Expose()
  roles: Role[];
}
