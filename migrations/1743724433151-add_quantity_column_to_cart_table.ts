import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQuantityColumnToCartTable1743724433151
  implements MigrationInterface
{
  name = 'AddQuantityColumnToCartTable1743724433151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" ADD "quantity" integer NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "quantity"`);
  }
}
