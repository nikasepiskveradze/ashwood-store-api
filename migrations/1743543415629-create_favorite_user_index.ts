import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFavoriteUserIndex1743543415629
  implements MigrationInterface
{
  name = 'CreateFavoriteUserIndex1743543415629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "favorite_user_index" ON "favorite" ("userId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."favorite_user_index"`);
  }
}
