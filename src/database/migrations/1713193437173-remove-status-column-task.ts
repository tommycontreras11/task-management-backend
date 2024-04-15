import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveStatusColumnTask1713193437173 implements MigrationInterface {
    name = 'RemoveStatusColumnTask1713193437173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`status\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`status\` enum ('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL`);
    }

}
