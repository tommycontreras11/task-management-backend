import { Column, Entity, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { UserInfoEntity } from "./user-info.entity";
import { UserPasswordEntity } from "./user-password.entity";
import { WorkspaceEntity } from "./workspace.entity";
import { BoardEntity } from "./board.entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => UserInfoEntity, (userInfo) => userInfo.user)
  userInfo: UserInfoEntity;

  @OneToMany(() => UserPasswordEntity, (userPassword) => userPassword.user)
  userPasswords: UserPasswordEntity[];

  @OneToMany(() => WorkspaceEntity, (workspace) => workspace.userId)
  workspaces: WorkspaceEntity;

  @ManyToMany(() => BoardEntity, (board) => board.users)
  boards: BoardEntity[];
}
