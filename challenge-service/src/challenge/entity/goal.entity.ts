import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Challenge } from './challenge.entity';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  attend: number;

  @Column({ default: 0 })
  weight: number;

  @Column({ default: 0 })
  muscle: number;

  @Column({ default: 0 })
  fat: number;

  @OneToOne(() => Challenge, (challenge) => challenge.goal, {
    cascade: true,
  })
  @JoinColumn()
  challenge: Challenge;
}
