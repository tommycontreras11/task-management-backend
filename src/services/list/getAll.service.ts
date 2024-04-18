import { ListEntity } from "../../database/entities/entity/list.entity";
import { FindManyOptions } from "typeorm";
import { statusCode } from "../../utils/statusCode";

export async function getAllListService(options?: FindManyOptions<ListEntity>) {
  const lists = await ListEntity.find(options).catch((e) => {
    console.error("getAllListService -> ListEntity.find: ", e);
    return null;
  });

  if (!lists)
    return Promise.reject({
      message: "Lists not found",
      status: statusCode.NOT_FOUND,
    });

  return lists;
}
