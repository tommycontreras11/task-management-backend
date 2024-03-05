import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedWorkpaceBoardEntities1709661468692 implements MigrationInterface {
    name = 'AddedWorkpaceBoardEntities1709661468692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_166bd96559cb38595d392f75a35\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`userId\` \`boardId\` int NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`boards\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`workspaceId\` int NOT NULL, UNIQUE INDEX \`IDX_9cf0ff28e768678e382fedac49\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspaces\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`type\` enum ('PERSONAL', 'TEAM') NOT NULL, \`description\` text NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board-users\` (\`boardId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_353f46466ef6d75490fcfe4e64\` (\`boardId\`), INDEX \`IDX_9511d30bf42cceec7abe8c7c10\` (\`userId\`), PRIMARY KEY (\`boardId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_8a75fdea98c72c539a0879cb0d1\` FOREIGN KEY (\`boardId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`boards\` ADD CONSTRAINT \`FK_f13eef6b2a45019e1df9cfe9963\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspaces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspaces\` ADD CONSTRAINT \`FK_dc53b3d0b16419a8f5f17458403\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board-users\` ADD CONSTRAINT \`FK_353f46466ef6d75490fcfe4e649\` FOREIGN KEY (\`boardId\`) REFERENCES \`boards\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`board-users\` ADD CONSTRAINT \`FK_9511d30bf42cceec7abe8c7c10b\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board-users\` DROP FOREIGN KEY \`FK_9511d30bf42cceec7abe8c7c10b\``);
        await queryRunner.query(`ALTER TABLE \`board-users\` DROP FOREIGN KEY \`FK_353f46466ef6d75490fcfe4e649\``);
        await queryRunner.query(`ALTER TABLE \`workspaces\` DROP FOREIGN KEY \`FK_dc53b3d0b16419a8f5f17458403\``);
        await queryRunner.query(`ALTER TABLE \`boards\` DROP FOREIGN KEY \`FK_f13eef6b2a45019e1df9cfe9963\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_8a75fdea98c72c539a0879cb0d1\``);
        await queryRunner.query(`DROP INDEX \`IDX_9511d30bf42cceec7abe8c7c10\` ON \`board-users\``);
        await queryRunner.query(`DROP INDEX \`IDX_353f46466ef6d75490fcfe4e64\` ON \`board-users\``);
        await queryRunner.query(`DROP TABLE \`board-users\``);
        await queryRunner.query(`DROP TABLE \`workspaces\``);
        await queryRunner.query(`DROP INDEX \`IDX_9cf0ff28e768678e382fedac49\` ON \`boards\``);
        await queryRunner.query(`DROP TABLE \`boards\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`boardId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_166bd96559cb38595d392f75a35\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
