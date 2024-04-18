import { ListEntity } from "../../database/entities/entity/list.entity";
import { BoardEntity } from "../../database/entities/entity/board.entity";
import { CreateListDTO } from "../../dto/list.dto";
import { statusCode } from "../../utils/statusCode";

export async function createListService({ boardUUID, title }: CreateListDTO) {
  const board = await BoardEntity.findOne({
    where: { uuid: boardUUID },
  }).catch((e) => {
    console.error("createListService -> BoardEntity.create: ", e);
    return null;
  });

  if (!board)
    return Promise.reject({
      message: "Board not found",
      status: statusCode.NOT_FOUND,
    });

  const list = await ListEntity.create({
    boardId: board.id,
    title,
  })
    .save()
    .catch((e) => {
      console.error("createListService -> ListEntity.create: ", e);
      return null;
    });

  if (!list)
    return Promise.reject({
      message: "List not found",
      status: statusCode.NOT_FOUND,
    });

  return "List created successfully";
}
