import { WorkspaceEntity } from "../../database/entities/entity/workspace.entity";
import { CreateBoardDTO } from "../../dto/board.dto";
import { statusCode } from "../../utils/statusCode";
import { In } from "typeorm";
import { UserEntity } from "../../database/entities/entity/user.entity";
import { BoardEntity } from "../../database/entities/entity/board.entity";
import { error } from "console";

export async function createBoardService({ workspaceUUID, userUUIDs, title }: CreateBoardDTO) {
  const foundBoardByTitle = await BoardEntity.findOne({
    where: {
      title,
    }
  }).catch((e) => {
    console.error("createBoardService -> BoardEntity.findOne: ", e);
    return null;
  })

  if(foundBoardByTitle) return Promise.reject({ error: 'Board with this title already exists', status: statusCode.CONFLICT })
  
  const foundWorkspace = await WorkspaceEntity.findOne({
    where: {
      uuid: workspaceUUID,
    },
  }).catch((e) => {
    console.error("createBoardService -> WorkspaceEntity.findOne: ", e);
    return null;
  });

  if (!foundWorkspace)
    return Promise.reject({
      message: "Workspace not found",
      status: statusCode.NOT_FOUND,
    });

  const foundUsers = await UserEntity.find({
    where: {
      uuid: In(userUUIDs),
    },
  }).catch((e) => {
    console.error("createBoardService -> UserEntity.findOne: ", e);
    return null;
  });

  if (!foundUsers)
    return Promise.reject({
      message: "Users not found",
      status: statusCode.NOT_FOUND,
    });

  const board = await BoardEntity.create({
    workspaceId: foundWorkspace.id,
    users: foundUsers,
    title,
  }).save().catch((e) => {
    console.error("createBoardService -> BoardEntity.create: ", e);
    return null;
  })

  if(!board) return Promise.reject({ message: 'Board not created', status: statusCode.BAD_REQUEST })

  return "Board created successfully"
}
