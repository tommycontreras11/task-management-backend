import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: 'user-passwords' })
export class UserPasswordEntity extends BaseEntity {
    @Column({ unique: true })
    password: string

    @Column({ default: true })
    active: boolean

    @Column()
    userId: number

    @ManyToOne(() => UserEntity, (user) => user.userPasswords, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: UserEntity
}