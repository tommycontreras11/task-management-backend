import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { UserInfoEntity } from "./user-info.entity";
import { UserPasswordEntity } from "./user-password.entity";
import { TaskEntity } from "./task.entity";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string

    @OneToOne(() => UserInfoEntity, (userInfo) => userInfo.user)
    userInfo: UserInfoEntity

    @OneToMany(() => UserPasswordEntity, (userPassword) => userPassword.user)
    userPasswords: UserPasswordEntity[]

    @OneToMany(() => TaskEntity, (task) => task.user)
    tasks: TaskEntity[]
}