import { ArrayUnique } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Publisher } from '../../publisher/entities/publisher.entity';

export const GameConfig = {
  titleMaxLength: 64,
};

@Entity({ name: 'Game' })
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: GameConfig.titleMaxLength })
  title!: string;

  @Column({ precision: 10, scale: 2 })
  price!: number;

  @Column({ precision: 4, scale: 3 })
  discount?: number;

  @Column('simple-array', { default: [] })
  tags?: string[];

  @Column()
  @ArrayUnique()
  releaseDate!: Date;

  @ManyToOne(() => Publisher, (publisher) => publisher.id)
  @JoinColumn({ name: 'Publisher_id' })
  publisher!: Publisher;

  @Column({ name: 'Publisher_id' })
  publisherId!: number;
}
