import { UserInfoEntity } from "../../database/entities/entity/user-info.entity";
import { UserPasswordEntity } from "../../database/entities/entity/user-password.entity";
import { UserEntity } from "../../database/entities/entity/user.entity";
import { CreateUserDTO } from "../../dto/user.dto";
import { statusCode } from "../../utils/statusCode";
import { generateUserName } from "../../utils/string.util";
import { checkIfUserExists } from "../../utils/userUtil";
import bcrypt from "bcrypt";

export async function createUserService({ email, password, info, ...payload }: CreateUserDTO) {
  const validateEmail = await checkIfUserExists(email);

  if (validateEmail)
    return Promise.reject({
      message: "User with this email already exists",
      status: statusCode.BAD_REQUEST,
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserEntity.create({
    email,
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("UserEntity.create: ", e);
      return null;
    });

  if (!user)
    return Promise.reject({
      message: "User not created",
      status: statusCode.BAD_REQUEST,
    });

  const userName = generateUserName(payload.firstName, payload.lastName);

  const userInfo = await UserInfoEntity.create({
    user,
    ...info,
    userName,
  })
    .save()
    .catch((e) => {
      console.error("UserInfoEntity.create: ", e);
      return null;
    });

  if (!userInfo) {
    await user.remove();
    return Promise.reject({
      message: "User info not created",
      status: statusCode.BAD_REQUEST,
    });
  }

  const userPassword = await UserPasswordEntity.create({
    user,
    password: hashedPassword,
  })
    .save()
    .catch((e) => {
      console.error("UserPasswordEntity.create: ", e);
      return null;
    });

  if (!userPassword) {
    await user.remove();
    return Promise.reject({
      message: "User password not created",
      status: statusCode.BAD_REQUEST,
    });
  }

  return "User created successfully";
}
