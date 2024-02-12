import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { UserEntity } from "./user.entity";

export enum GenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export type GenderType = `${GenderEnum}`

@Entity({ name: 'user-info' })
export class UserInfoEntity extends BaseEntity {
    @Column({ type: 'timestamp' })
    birthDate: Date

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    mobile: string

    @Column({ enum: GenderEnum })
    gender: GenderType

    @Column()
    userId: number

    @OneToOne(() => UserEntity, (user) => user.userInfo)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: UserEntity
}