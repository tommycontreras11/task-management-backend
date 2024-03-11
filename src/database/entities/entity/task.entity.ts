import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { BoardEntity } from "./board.entity";
import { FileEntity } from "./file.entity";

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum PriorityTaskStatus {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export type TaskStatusType = `${TaskStatus}`;
export type PriorityTaskStatusType = `${PriorityTaskStatus}`;

@Entity({ name: "tasks" })
export class TaskEntity extends BaseEntity {
  @Column({ type: "text" })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "enum", enum: TaskStatus })
  status: TaskStatusType;

  @Column({ type: "enum", enum: PriorityTaskStatus })
  priority: PriorityTaskStatusType;

  @Column({ type: "datetime" })
  dueDate: Date;

  @Column()
  boardId: number;

  @ManyToOne(() => BoardEntity, (board) => board.tasks)
  @JoinColumn({ name: "boardId", referencedColumnName: "id" })
  board: BoardEntity;

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
