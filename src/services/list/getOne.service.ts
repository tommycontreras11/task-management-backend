import { ListEntity } from "../../database/entities/entity/list.entity";
import { FindOneOptions } from "typeorm";
import { statusCode } from "../../utils/statusCode";

export async function getOneListService(options: FindOneOptions<ListEntity>) {
  const list = await ListEntity.findOne(options).catch((e) => {
    console.error("getOneListService -> ListEntity.findOne: ", e);
    return null;
  });

  if (!list)
    return Promise.reject({
      message: "List not found",
      status: statusCode.NOT_FOUND,
    });

  return list;
}
