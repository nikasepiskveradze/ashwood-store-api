import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLastnameColumnToUsersTable1694237077485
  implements MigrationInterface
{
  name = 'AddLastnameColumnToUsersTable1694237077485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "lastname" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
  }
}
