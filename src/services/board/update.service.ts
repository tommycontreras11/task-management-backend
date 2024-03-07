import { BoardEntity } from "../../database/entities/entity/board.entity";
import { UserEntity } from "../../database/entities/entity/user.entity";
import { WorkspaceEntity } from "../../database/entities/entity/workspace.entity";
import { UpdateBoardDTO } from "../../dto/board.dto";
import { In } from "typeorm";
import { statusCode } from "../../utils/statusCode";

export async function updateBoardService(uuid: string, { workspaceUUID, userUUIDs, title }: UpdateBoardDTO) {
  const foundBoard = await BoardEntity.findOne({
    where: { uuid },
    relations: {
      users: true,
    },
  }).catch((e) => {
    console.error("updateBoardService -> BoardEntity.findOne: ", e);
    return null;
  });

  if (!foundBoard)
    return Promise.reject({
      message: "Board not found",
      status: statusCode.NOT_FOUND,
    });

  let workspace: WorkspaceEntity | null = null;

  if (workspaceUUID) {
    const foundWorkspace = await WorkspaceEntity.findOne({
      where: {
        uuid: workspaceUUID,
      },
    }).catch((e) => {
      console.error("updateBoardService -> WorkspaceEntity.findOne: ", e);
      return null;
    });

    if (!foundWorkspace)
      return Promise.reject({
        message: "Workspace not found",
        status: statusCode.NOT_FOUND,
      });

    workspace = foundWorkspace;
  }

  let users: UserEntity[] | null = null;

  if (userUUIDs) {
    const foundUsers = await UserEntity.find({
      where: {
        uuid: In(userUUIDs),
      },
    }).catch((e) => {
      console.error("updateBoardService -> UserEntity.find: ", e);
      return null;
    });

    if (!foundUsers)
      return Promise.reject({
        message: "Users not found",
        status: statusCode.NOT_FOUND,
      });

    users = foundUsers;
  }

  foundBoard.workspaceId = workspace ? workspace.id : foundBoard.workspaceId;
  foundBoard.users = users ? [...users] : [...foundBoard.users];
  foundBoard.title = title ? title : foundBoard.title;
  
  await foundBoard.save().catch((e) => {
    console.error("updateBoardService -> BoardEntity.save: ", e);
    return null;
  })

  return "Board updated successfully";
}
