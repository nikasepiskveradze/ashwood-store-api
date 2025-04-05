import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderTable1743889495430 implements MigrationInterface {
  name = 'CreateOrderTable1743889495430';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "userId" integer, "productId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_88991860e839c6153a7ec878d39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`,
    );
    await queryRunner.query(`DROP TABLE "order"`);
  }
}
