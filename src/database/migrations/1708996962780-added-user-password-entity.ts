import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserPasswordEntity1708996962780 implements MigrationInterface {
    name = 'AddedUserPasswordEntity1708996962780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user-info\` DROP FOREIGN KEY \`FK_737595561345b87f0f377f019ba\``);
        await queryRunner.query(`CREATE TABLE \`user-passwords\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`password\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`userId\` int NOT NULL, UNIQUE INDEX \`IDX_75c3c6f3862279905fbfcf3723\` (\`password\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user-info\` ADD CONSTRAINT \`FK_737595561345b87f0f377f019ba\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user-passwords\` ADD CONSTRAINT \`FK_5206638ec85da31e05b0a12f0a7\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user-passwords\` DROP FOREIGN KEY \`FK_5206638ec85da31e05b0a12f0a7\``);
        await queryRunner.query(`ALTER TABLE \`user-info\` DROP FOREIGN KEY \`FK_737595561345b87f0f377f019ba\``);
        await queryRunner.query(`DROP INDEX \`IDX_75c3c6f3862279905fbfcf3723\` ON \`user-passwords\``);
        await queryRunner.query(`DROP TABLE \`user-passwords\``);
        await queryRunner.query(`ALTER TABLE \`user-info\` ADD CONSTRAINT \`FK_737595561345b87f0f377f019ba\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
