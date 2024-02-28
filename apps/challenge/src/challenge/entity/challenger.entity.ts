import {
  ManyToOne,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Challenge } from './challenge.entity';

@Entity()
export class Challenger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isHost: boolean;

  @Column({ default: false })
  isSuccess: boolean;

  @ManyToOne(() => Challenge, (challenge) => challenge.challenger, {
    cascade: true,
  })
  @JoinColumn()
  challenge: Challenge;

  @Column({ nullable: false })
  userId: string;
}
