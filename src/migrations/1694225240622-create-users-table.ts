import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1694225240622 implements MigrationInterface {
  name = 'CreateUsersTable1694225240622';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birthday" date NOT NULL, "balance" integer NOT NULL DEFAULT '10000', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
