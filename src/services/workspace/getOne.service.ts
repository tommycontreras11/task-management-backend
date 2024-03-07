import { WorkspaceEntity } from "../../database/entities/entity/workspace.entity";
import { FindOneOptions } from "typeorm";
import { statusCode } from "../../utils/statusCode";

export async function getOneWorkspaceService(options: FindOneOptions<WorkspaceEntity>) {
  const workspace = await WorkspaceEntity.findOne(options).catch((e) => {
    console.error("getOneWorkspaceService -> WorkspaceEntity.findOne: ", e);
    return null;
  });

  if (!workspace)
    return Promise.reject({
      message: "Workspace not found",
      status: statusCode.NOT_FOUND,
    });

  return workspace;
}
