import { UserEntity } from "../../database/entities/entity/user.entity";
import { statusCode } from "../../utils/statusCode";

export async function deleteUserService(uuid: string) {
  const foundUser = await UserEntity.findOne({ where: { uuid } }).catch((e) => {
    console.error("UserEntity.findOne: ", e);
    return null;
  });

  if (!foundUser)
    return Promise.reject({
      message: "User not found",
      status: statusCode.NOT_FOUND,
    });

  await foundUser.softRemove().catch((e) => {
    console.error("UserEntity.softRemove: ", e);
    return null;
  });

  return "User deleted successfully";
}
