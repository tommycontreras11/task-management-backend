import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDueDateToNullableTaskTable1714066462729 implements MigrationInterface {
    name = 'AddedDueDateToNullableTaskTable1714066462729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`dueDate\` \`dueDate\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`dueDate\` \`dueDate\` datetime NOT NULL`);
    }

}
