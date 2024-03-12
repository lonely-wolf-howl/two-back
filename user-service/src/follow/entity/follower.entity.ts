import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Follower {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  followerId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.follower, {
    cascade: true,
  })
  @JoinColumn()
  user: User;
}
