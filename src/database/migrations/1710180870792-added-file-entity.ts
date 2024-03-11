import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedFileEntity1710180870792 implements MigrationInterface {
    name = 'AddedFileEntity1710180870792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`files\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`fileName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task-files\` (\`taskId\` int NOT NULL, \`fileId\` int NOT NULL, INDEX \`IDX_bdcaf2cd58c4ed817ecab49d66\` (\`taskId\`), INDEX \`IDX_95fd3415e79cd38abd1c1a3fc6\` (\`fileId\`), PRIMARY KEY (\`taskId\`, \`fileId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`task-files\` ADD CONSTRAINT \`FK_bdcaf2cd58c4ed817ecab49d662\` FOREIGN KEY (\`taskId\`) REFERENCES \`tasks\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`task-files\` ADD CONSTRAINT \`FK_95fd3415e79cd38abd1c1a3fc65\` FOREIGN KEY (\`fileId\`) REFERENCES \`files\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task-files\` DROP FOREIGN KEY \`FK_95fd3415e79cd38abd1c1a3fc65\``);
        await queryRunner.query(`ALTER TABLE \`task-files\` DROP FOREIGN KEY \`FK_bdcaf2cd58c4ed817ecab49d662\``);
        await queryRunner.query(`DROP INDEX \`IDX_95fd3415e79cd38abd1c1a3fc6\` ON \`task-files\``);
        await queryRunner.query(`DROP INDEX \`IDX_bdcaf2cd58c4ed817ecab49d66\` ON \`task-files\``);
        await queryRunner.query(`DROP TABLE \`task-files\``);
        await queryRunner.query(`DROP TABLE \`files\``);
    }

}
