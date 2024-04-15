import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { BoardEntity } from "./board.entity";
import { TaskEntity } from "./task.entity";

@Entity({ name: "lists" })
export class ListEntity extends BaseEntity {
    @Column()
    title: string;

    @Column()
    boardId: number;
  
    @ManyToOne(() => BoardEntity, (board) => board.lists)
    @JoinColumn({ name: "boardId", referencedColumnName: "id" })
    board: BoardEntity;

    @OneToMany(() => TaskEntity, (task) => task.list)
    tasks: TaskEntity[];
}