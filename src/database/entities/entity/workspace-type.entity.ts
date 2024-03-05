import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { WorkspaceEntity } from "./workspace.entity";

@Entity({ name: "workspace-types" })
export class WorkspaceTypeEntity extends BaseEntity {
  @Column()
  type: string;

  @OneToMany(() => WorkspaceEntity, (workspace) => workspace.type)
  workspaces: WorkspaceEntity[];
}
