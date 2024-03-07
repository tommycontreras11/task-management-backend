import { BoardEntity } from "../../database/entities/entity/board.entity";
import { statusCode } from "../../utils/statusCode";

export async function deleteBoardService(uuid: string) {
  const foundBoard = await BoardEntity.findOne({
    where: { uuid },
  }).catch((e) => {
    console.error("deleteBoardService -> BoardEntity.findOne: ", e);
    return null;
  });

  if (!foundBoard)
    return Promise.reject({
      message: "Board not found",
      status: statusCode.NOT_FOUND,
    });

  await foundBoard.softRemove().catch((e) => {
    console.error("deleteBoardService -> BoardEntity.softRemove: ", e);
    return null;
  });

  return "Board deleted successfully";
}
