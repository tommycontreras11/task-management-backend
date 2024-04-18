import { ListEntity } from "../../database/entities/entity/list.entity";
import { UpdateListDTO } from "../../dto/list.dto";
import { statusCode } from "../../utils/statusCode";
import { BoardEntity } from "../../database/entities/entity/board.entity";

export async function updateListService(
  uuid: string,
  { boardUUID, title }: UpdateListDTO
) {
  const foundList = await ListEntity.findOne({
    where: {
      uuid,
    },
  }).catch((e) => {
    console.error("createTaskService -> ListEntity.findOne: ", e);
    return null;
  });

  if (!foundList)
    return Promise.reject({
      message: "List not found",
      status: statusCode.NOT_FOUND,
    });

  const foundBoard = await BoardEntity.findOne({
    where: { uuid: boardUUID },
  }).catch((e) => {
    console.error("createListService -> BoardEntity.create: ", e);
    return null;
  });

  if (!foundBoard)
    return Promise.reject({
      message: "Board not found",
      status: statusCode.NOT_FOUND,
    });

  await ListEntity.update(
    { id: foundList.id },
    {
      title: title ? title : foundList.title,
      boardId: foundBoard.id,
    }
  ).catch((e) => {
    console.error("updateListService -> ListEntity.update: ", e);
    return null;
  });

  return "List updated successfully";
}
