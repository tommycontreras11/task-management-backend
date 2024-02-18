import { Exclude } from "class-transformer";
import {
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity as Base
} from "typeorm";

export class BaseEntity extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated("uuid")
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude({ toPlainOnly: true })
  deletedAt: Date;
}
