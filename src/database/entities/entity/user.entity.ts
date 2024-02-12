import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { UserInfoEntity } from "./user-info.entity";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @Column({ unique: true })
    userName: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string

    @OneToOne(() => UserInfoEntity, (userInfo) => userInfo.user)
    userInfo: UserInfoEntity
}