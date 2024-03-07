import { UserEntity } from "../../database/entities/entity/user.entity";
import { WorkspaceTypeEntity } from "../../database/entities/entity/workspace-type.entity";
import { WorkspaceEntity } from "../../database/entities/entity/workspace.entity";
import { CreateWorkspaceDTO } from "../../dto/workspace.dto";
import { statusCode } from "../../utils/statusCode";

export async function createWorkspaceService({ userUUID, typeUUID, ...payload }: CreateWorkspaceDTO) {
  const user = await UserEntity.findOne({
    where: {
      uuid: userUUID,
    },
  }).catch((e) => {
    console.error("createWorkspaceServive -> UserEntity.findOne: ", e);
    return null;
  });

  if (!user)
    return Promise.reject({
      message: "User not found",
      status: statusCode.NOT_FOUND,
    });

  const workspaceType = await WorkspaceTypeEntity.findOne({
    where: {
      uuid: typeUUID,
    },
  }).catch((e) => {
    console.error("createWorkspaceServive -> WorkspaceTypeEntity.findOne: ", e);
    return null;
  });

  if (!workspaceType)
    return Promise.reject({
      message: "Workspace type not found",
      status: statusCode.NOT_FOUND,
    });

  const workspace = await WorkspaceEntity.create({
    user,
    workspaceType,
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("createWorkspaceServive -> WorkspaceEntity.create: ", e);
      return null;
    });

  if (!workspace)
    return Promise.reject({
      message: "Workspace not created",
      status: statusCode.BAD_REQUEST,
    });

  return "Workspace created successfully";
}
