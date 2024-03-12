import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { UserDetail } from './user-detail.entity';
import { Follower } from '../../follow/entity/follower.entity';
import { FollowMessage } from '../../follow/entity/follow-message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => UserDetail, (userDetail) => userDetail.user)
  userDetail: UserDetail;

  @OneToMany(() => Follower, (follower) => follower.user)
  follower: Follower[];

  @OneToMany(() => FollowMessage, (followMessage) => followMessage.user)
  followMessage: FollowMessage[];
}
