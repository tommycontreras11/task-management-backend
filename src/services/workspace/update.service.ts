import { WorkspaceTypeEntity } from "../../database/entities/entity/workspace-type.entity";
import { WorkspaceEntity } from "../../database/entities/entity/workspace.entity";
import { UpdateWorkspaceDTO } from "../../dto/workspace.dto";
import { statusCode } from "../../utils/statusCode";

export async function updateWorkspaceService(uuid: string, { typeUUID, ...payload }: UpdateWorkspaceDTO) {
  const foundWorkspace = await WorkspaceEntity.findOne({
    where: {
      uuid,
    },
  }).catch((e) => {
    console.log("updateWorkspaceService -> WorkspaceEntity.findOne: ", e);
    return null;
  });

  if (!foundWorkspace)
    return Promise.reject({
      message: "Workspace not found",
      status: statusCode.NOT_FOUND,
    });

  let workspaceType: WorkspaceTypeEntity | null = null;
  if (typeUUID) {
    const foundWorkspaceType = await WorkspaceTypeEntity.findOne({
      where: {
        uuid: typeUUID,
      },
    }).catch((e) => {
      console.log("updateWorkspaceService -> WorkspaceTypeEntity.findOne: ", e);
      return null;
    });

    if (!foundWorkspaceType)
      return Promise.reject({
        message: "Workspace type not found",
        status: statusCode.NOT_FOUND,
      });

    workspaceType = foundWorkspaceType;
  }

  const workspace = await WorkspaceEntity.update(
    { id: foundWorkspace.id },
    { ...(workspaceType && { workspaceType }), ...payload }
  ).catch((e) => {
    console.log("updateWorkspaceService -> WorkspaceEntity.update: ", e);
    return null;
  });

  if (!workspace)
    return Promise.reject({
      message: "Workspace not updated",
      status: statusCode.BAD_REQUEST,
    });

  return "Workspace updated successfully";
}
