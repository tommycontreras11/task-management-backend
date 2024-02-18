import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1708214394561 implements MigrationInterface {
    name = 'InitMigration1708214394561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userName\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_226bb9aa7aa8a69991209d58f5\` (\`userName\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user-info\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`birthDate\` timestamp NOT NULL, \`phone\` varchar(255) NULL, \`mobile\` varchar(255) NULL, \`gender\` enum ('MALE', 'FEMALE', 'OTHER') NOT NULL, \`userId\` int NOT NULL, UNIQUE INDEX \`REL_737595561345b87f0f377f019b\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user-info\` ADD CONSTRAINT \`FK_737595561345b87f0f377f019ba\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user-info\` DROP FOREIGN KEY \`FK_737595561345b87f0f377f019ba\``);
        await queryRunner.query(`DROP INDEX \`REL_737595561345b87f0f377f019b\` ON \`user-info\``);
        await queryRunner.query(`DROP TABLE \`user-info\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_226bb9aa7aa8a69991209d58f5\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
