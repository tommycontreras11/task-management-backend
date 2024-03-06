import { WorkspaceTypeEntity } from "../../../database/entities/entity/workspace-type.entity"

const workspaces = [
    "Personal",
    "Team"
]

export const workspaceTypeData: Partial<WorkspaceTypeEntity>[] = workspaces.map((workspace) => ({
    type: workspace
}))