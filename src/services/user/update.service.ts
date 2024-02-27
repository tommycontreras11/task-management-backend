import { UserInfoEntity } from "../../database/entities/entity/user-info.entity";
import { UserPasswordEntity } from "../../database/entities/entity/user-password.entity";
import { UserEntity } from "../../database/entities/entity/user.entity";
import { UpdateUserDTO } from "../../dto/user.dto";
import { statusCode } from "../../utils/statusCode";
import { checkIfUserExists } from "../../utils/userUtil";

export async function updateUserService(uuid: string, { info, email, password, ...payload }: UpdateUserDTO) {
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

      const userPasswords = await UserPasswordEntity.find({
        where: {
          userId: user.id
        },
        withDeleted: true
      })

    const validatePassword = await recursiveFindUserPassword(user, [...userPasswords], password)

    if(validatePassword) {
      return Promise.reject({
        message: "Please, select another password that is not in use",
        status: statusCode.BAD_REQUEST
      })
    }else {
      await recursiveRemoveAllUserPassword(user, [...userPasswords])

      const userPassword = await UserPasswordEntity.create({
        user,
        password,
      }).save().catch((e) => {
        console.error("UserPasswordEntity.create: ", e);
        return null;
      });

      if (!userPassword) {
        return Promise.reject({
          message: "User password not created",
          status: statusCode.BAD_REQUEST,
        })
      }
    }

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

const recursiveFindUserPassword = async (user: UserEntity, passwordsToCompare: UserPasswordEntity[], password: string): Promise<unknown> => {
  const payload = await passwordsToCompare.pop()
  
  if(!payload) return

  if(payload.password !== password) return recursiveFindUserPassword(user, passwordsToCompare, password)
  if(payload.password === password) return true

  return false
}

const recursiveRemoveAllUserPassword = async (user: UserEntity, passwordsToCompare: UserPasswordEntity[]): Promise<unknown> => {
  const payload = await passwordsToCompare.pop()
  
  if(!payload) return

  payload.active = false
  payload.save()
  
  await payload.softRemove().catch((e) => {
    console.error("UserPasswordEntity.softRemove: ", e);
    return null;
  })

  return recursiveRemoveAllUserPassword(user, passwordsToCompare)
}