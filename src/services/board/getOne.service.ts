import { statusCode } from "../../utils/statusCode";
import { BoardEntity } from "../../database/entities/entity/board.entity";
import { FindOneOptions } from "typeorm";

export async function getOneBoardService(options: FindOneOptions<BoardEntity>) {
  const board = await BoardEntity.findOne(options).catch((e) => {
    console.error("getOneBoardService -> BoardEntity.findOne: ", e);
    return null;
  });

  if (!board)
    return Promise.reject({
      message: "Board not found",
      status: statusCode.NOT_FOUND,
    });

  return board;
}
