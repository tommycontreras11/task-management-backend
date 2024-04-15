import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { ListEntity } from "./list.entity";
import { UserEntity } from "./user.entity";
import { WorkspaceEntity } from "./workspace.entity";

@Entity({ name: "boards" })
export class BoardEntity extends BaseEntity {
  @Column({ unique: true })
  title: string;

  @Column()
  workspaceId: number;

  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.boards)
  @JoinColumn({ name: "workspaceId", referencedColumnName: "id" })
  workspace: WorkspaceEntity;

  @OneToMany(() => ListEntity, (list) => list.board)
  lists: ListEntity[];

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
