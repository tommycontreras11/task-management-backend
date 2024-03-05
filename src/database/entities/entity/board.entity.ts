import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { WorkspaceEntity } from "./workspace.entity";
import { TaskEntity } from "./task.entity";
import { UserEntity } from "./user.entity";
import { BaseEntity } from "../base/base.entity";

@Entity({ name: "boards" })
export class BoardEntity extends BaseEntity {
  @Column({ unique: true })
  title: string;

  @Column()
  workspaceId: number;

  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.boards)
  @JoinColumn({ name: "workspaceId", referencedColumnName: "id" })
  workspace: WorkspaceEntity;

  @OneToMany(() => TaskEntity, (task) => task.board)
  tasks: TaskEntity[];

  @ManyToMany(() => UserEntity, (user) => user.boards)
  @JoinTable({
    name: "board-users",
    joinColumn: {
      name: "boardId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
  })
  users: UserEntity[];
}
