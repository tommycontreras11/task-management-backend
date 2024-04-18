import { ListEntity } from "../../database/entities/entity/list.entity";
import { statusCode } from "../../utils/statusCode";

export async function deleteListService(listUUID: string) {
  const foundList = await ListEntity.findOne({
    where: { uuid: listUUID },
  }).catch((e) => {
    console.error("deleteListService -> ListEntity.findOne: ", e);
    return null;
  });

  if (!foundList)
    return Promise.reject({
      message: "List not found",
      status: statusCode.NOT_FOUND,
    });

  await foundList.softRemove().catch((e) => {
    console.error("deleteListService -> ListEntity.softRemove: ", e);
    return null;
  });

  return "List deleted successfully";
}
