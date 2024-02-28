import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Goal } from './goal.entity';
import { Challenger } from './challenger.entity';

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  week: number;

  @Column()
  limit: number;

  @Column()
  isPublic: boolean;

  @Column({ nullable: true })
  description: string;

  @Column()
  entryPoint: number;

  @Column({ default: false })
  isStarted: boolean;

  @Column({ default: false })
  isDistributed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToOne(() => Goal, (goal) => goal.challenge)
  goal: Goal;

  @OneToMany(() => Challenger, (challenger) => challenger.challenge)
  challenger: Challenger[];

  @Column({ nullable: false })
  userId: string;
}
