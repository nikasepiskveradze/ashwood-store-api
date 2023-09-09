import { IsNumber } from 'class-validator';

export class AssignRoleUserDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  roleId: number;
}
