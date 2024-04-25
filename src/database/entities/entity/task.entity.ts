import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { FileEntity } from "./file.entity";
import { ListEntity } from "./list.entity";

export enum PriorityTaskStatus {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export type PriorityTaskStatusType = `${PriorityTaskStatus}`;

@Entity({ name: "tasks" })
export class TaskEntity extends BaseEntity {
  @Column({ type: "text" })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;
  
  @Column({ type: "enum", enum: PriorityTaskStatus })
  priority: PriorityTaskStatusType;

  @Column({ type: "datetime", nullable: true })
  dueDate: Date;

  @Column()
  listId: number;

  @ManyToOne(() => ListEntity, (list) => list.tasks)
  @JoinColumn({ name: "listId", referencedColumnName: "id" })
  list: ListEntity;

  @ManyToMany(() => FileEntity, (file) => file.tasks)
  @JoinTable({
    name: 'task-files',
    joinColumn: {
      name: 'taskId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'fileId',
      referencedColumnName: 'id'
    }
  })
  files: FileEntity[]
}
