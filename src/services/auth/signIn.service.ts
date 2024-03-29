import { UserPasswordEntity } from "../../database/entities/entity/user-password.entity";
import { UserEntity } from "../../database/entities/entity/user.entity";
import { SignInDTO } from "../../dto/auth.dto";
import { statusCode } from "../../utils/statusCode";
import bcrypt from "bcrypt";

export async function signInService({ email, password }: SignInDTO): Promise<UserEntity> {
  const user = await UserEntity.findOne({ where: { email } }).catch((e) => {
    console.error("signInService -> UserEntity.findOne: ", e);
    return null;
  });

  if (!user)
    return Promise.reject({
      message: "User not found",
      status: statusCode.NOT_FOUND,
    });

  const userPassword = await UserPasswordEntity.findOne({
    where: {
      userId: user.id,
      active: true,
    },
  }).catch((e) => {
    console.error("signInService -> UserPasswordEntity.findOne: ", e);
    return null;
  });

  if (!userPassword)
    return Promise.reject({
      message: "User password not found",
      status: statusCode.NOT_FOUND,
    });

  const comparePasswords = await bcrypt.compare(
    password,
    userPassword.password
  );

  if (!comparePasswords)
    return Promise.reject({
      message: "Wrong password",
      status: statusCode.UNAUTHORIZED,
    });

  return Promise.resolve(user);
}
