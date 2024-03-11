import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { TaskEntity } from "./task.entity";

@Entity({ name: 'files' })
export class FileEntity extends BaseEntity {
    @Column()
    fileName: string

    @ManyToMany(() => TaskEntity, (task) => task.files)
    tasks: TaskEntity[]
}