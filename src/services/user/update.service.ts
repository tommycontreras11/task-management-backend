import { UserInfoEntity } from "../../database/entities/entity/user-info.entity";
import { UserEntity } from "../../database/entities/entity/user.entity";
import { UpdateUserDTO } from "../../dto/user.dto";
import { statusCode } from "../../utils/statusCode";
import { checkIfUserExists } from "../../utils/userUtil";

export async function updateUserService(uuid: string, { info, email, ...payload }: UpdateUserDTO) {
    const { foundUser, errorMessage } = await checkIfUserExists(
        email,
        info.userName
      );
      
      if (foundUser)
        return Promise.reject({
          message: errorMessage,
          status: statusCode.BAD_REQUEST,
        });
        
    const user = await UserEntity.findOne({ where: { uuid }, relations: { userInfo: true } }).catch((e) => {
      console.error("UserEntity.findOne: ", e);
      return null;
    })

    if (!user)
      return Promise.reject({
        message: "User not found",
        status: statusCode.NOT_FOUND,
      })

    await UserEntity.update({ uuid }, { ...payload, email }).catch((e) => {
        console.error("UserEntity.update: ", e);
        return null;
    });

    await UserInfoEntity.update({ user }, { ...info }).catch((e) => {
        console.error("UserInfoEntity.update: ", e);
        return null;
    })

    return "User updated successfully"
}
