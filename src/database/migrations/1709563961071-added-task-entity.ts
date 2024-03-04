import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTaskEntity1709563961071 implements MigrationInterface {
    name = 'AddedTaskEntity1709563961071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e530eb81c0a9746ec1594f0b99\` ON \`user-info\``);
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`title\` text NOT NULL, \`description\` text NULL, \`status\` enum ('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL, \`priority\` enum ('LOW', 'MEDIUM', 'HIGH') NOT NULL, \`dueDate\` datetime NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_166bd96559cb38595d392f75a35\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_166bd96559cb38595d392f75a35\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_e530eb81c0a9746ec1594f0b99\` ON \`user-info\` (\`userName\`)`);
    }

}
