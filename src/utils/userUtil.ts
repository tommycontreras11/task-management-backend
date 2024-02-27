import { UserEntity } from "../database/entities/entity/user.entity"

export async function checkIfUserExists(email: string) {
    let foundUser = await UserEntity.findOne({
        where: { email }
    })

    if(foundUser) return true 

    return false
}