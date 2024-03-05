import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedWorkpaceType1709662258078 implements MigrationInterface {
    name = 'AddedWorkpaceType1709662258078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workspaces\` CHANGE \`type\` \`typeId\` enum ('PERSONAL', 'TEAM') NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`workspace-types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`type\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`workspaces\` DROP COLUMN \`typeId\``);
        await queryRunner.query(`ALTER TABLE \`workspaces\` ADD \`typeId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`workspaces\` ADD CONSTRAINT \`FK_36188f7516d81399abd52b5fcec\` FOREIGN KEY (\`typeId\`) REFERENCES \`workspace-types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workspaces\` DROP FOREIGN KEY \`FK_36188f7516d81399abd52b5fcec\``);
        await queryRunner.query(`ALTER TABLE \`workspaces\` DROP COLUMN \`typeId\``);
        await queryRunner.query(`ALTER TABLE \`workspaces\` ADD \`typeId\` enum ('PERSONAL', 'TEAM') NOT NULL`);
        await queryRunner.query(`DROP TABLE \`workspace-types\``);
        await queryRunner.query(`ALTER TABLE \`workspaces\` CHANGE \`typeId\` \`type\` enum ('PERSONAL', 'TEAM') NOT NULL`);
    }

}
