import { WorkspaceEntity } from "../../database/entities/entity/workspace.entity";
import { FindManyOptions } from "typeorm";
import { statusCode } from "../../utils/statusCode";

export async function getAllWorkspaceService(options?: FindManyOptions<WorkspaceEntity>) {
  const workspaces = await WorkspaceEntity.find(options).catch((e) => {
    console.error("getAllWorkspaceService -> WorkspaceEntity.find: ", e);
    return null;
  });

  if (!workspaces)
    return Promise.reject({
      message: "Workspaces not found",
      status: statusCode.NOT_FOUND,
    });

  return workspaces;
}
