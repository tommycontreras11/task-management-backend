import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BoardEntity } from "./board.entity";
import { UserEntity } from "./user.entity";
import { BaseEntity } from "../base/base.entity";
import { WorkspaceTypeEntity } from "./workspace-type.entity";

@Entity({ name: "workspaces" })
export class WorkspaceEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  typeId: number;

  @Column()
  userId: number;

  @ManyToOne(() => WorkspaceTypeEntity, (type) => type.workspaces)
  @JoinColumn({ name: "typeId", referencedColumnName: "id" })
  workspaceType: WorkspaceTypeEntity;

  @OneToMany(() => BoardEntity, (board) => board.workspace)
  boards: BoardEntity[];

  @ManyToOne(() => UserEntity, (user) => user.workspaces)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: UserEntity;
}
