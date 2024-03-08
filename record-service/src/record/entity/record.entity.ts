import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gender: string;

  @Column()
  birthyear: number;

  @Column()
  weight: number;

  @Column()
  muscle: number;

  @Column()
  fat: number;

  @Column()
  kcal: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ nullable: false })
  userId: string;
}
