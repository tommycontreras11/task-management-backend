import { WorkspaceTypeEntity } from "../../../database/entities/entity/workspace-type.entity";
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { workspaceTypeData } from "../data/workspace-type.data";

export class WorkspaceTypeSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        try {
            const repository = dataSource.getRepository(WorkspaceTypeEntity)

            await Promise.all(
                workspaceTypeData.map(async (workspace) => {
                    const exists = await WorkspaceTypeEntity.findOne({
                        where: {
                            type: workspace.type
                        }
                    })

                    if(exists) return

                    await repository.save(workspace)
                })
            )
        } catch (error) {
            console.error('WorkspaceTypeSeeder -> run: ', error)
        }
    }
}