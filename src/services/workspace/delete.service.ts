import { WorkspaceEntity } from "../../database/entities/entity/workspace.entity";
import { statusCode } from "../../utils/statusCode";

export async function deleteWorkspaceService(uuid: string) {
  const foundWorkspace = await WorkspaceEntity.findOne({
    where: {
      uuid,
    },
  }).catch((e) => {
    console.error("deleteWorkspaceService -> WorkspaceEntity.findOne: ", e);
    return null;
  });

  if (!foundWorkspace)
    return Promise.reject({
      message: "Workspace not found",
      status: statusCode.NOT_FOUND,
    });

  await foundWorkspace.softRemove().catch((e) => {
    console.error("deleteWorkspaceService -> WorkspaceEntity.softRemove: ", e);
    return null;
  });

  return "Workspace deleted successfully";
}
