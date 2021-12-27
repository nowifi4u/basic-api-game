import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsPhoneNumber } from 'class-validator';

@Entity({ name: 'Publisher' })
export class Publisher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'int' })
  siret!: number;

  @Column()
  @IsPhoneNumber()
  phone!: string;
}
