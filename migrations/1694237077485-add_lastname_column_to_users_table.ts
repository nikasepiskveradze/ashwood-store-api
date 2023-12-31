import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLastnameColumnToUsersTable1694237077485
  implements MigrationInterface
{
  name = 'AddLastnameColumnToUsersTable1694237077485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastname" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastname"`);
  }
}
