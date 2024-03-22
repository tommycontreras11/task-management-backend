import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeBirthdateColumnNameUserInfo1711120135029 implements MigrationInterface {
    name = 'ChangeBirthdateColumnNameUserInfo1711120135029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user-info\` CHANGE \`birthDate\` \`birthdate\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user-info\` CHANGE \`birthdate\` \`birthDate\` timestamp NOT NULL`);
    }

}
