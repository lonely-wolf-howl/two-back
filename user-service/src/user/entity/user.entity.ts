import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDetail } from './user-detail.entity';
import { Follow } from '../../follow/entity/follow.entity';
import { FollowMessage } from '../../follow/entity/follow-message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => Follow, (follow) => follow.user)
  follow: Follow[];

  @OneToMany(() => FollowMessage, (followMessage) => followMessage.user)
  followMessage: FollowMessage[];
}
