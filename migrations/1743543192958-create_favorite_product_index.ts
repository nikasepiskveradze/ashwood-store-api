import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFavoriteProductIndex1743543192958
  implements MigrationInterface
{
  name = 'CreateFavoriteProductIndex1743543192958';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "favorite_product_index" ON "favorite" ("productId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."favorite_product_index"`);
  }
}
