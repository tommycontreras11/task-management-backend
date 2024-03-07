import { statusCode } from "../../utils/statusCode";
import { BoardEntity } from "../../database/entities/entity/board.entity";
import { FindManyOptions } from "typeorm";

export async function getAllBoardService(options?: FindManyOptions<BoardEntity>) {
  const boards = await BoardEntity.find(options).catch((e) => {
    console.error("getAllBoardService -> BoardEntity.find: ", e);
    return null;
  });

  if (!boards)
    return Promise.reject({
      message: "Boards not found",
      status: statusCode.NOT_FOUND,
    });

  return boards;
}
