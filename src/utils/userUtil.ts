import { UserEntity } from "../database/entities/entity/user.entity"

export async function checkIfUserExists(email: string, userName: string) {
    let foundUser = await UserEntity.findOne({
        where: { email }
    })

    let errorMessage = ''
    if(foundUser) {
        errorMessage = 'User with this email already exists'
    } else {
        foundUser = await UserEntity.findOne({
            where: { userInfo: { userName } },
            relations: { userInfo: true }
        })
        if(foundUser) {
            errorMessage = 'User with this userName already exists'
        }   
    }

    return { foundUser, errorMessage }
}