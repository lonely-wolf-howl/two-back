import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RefreshToken } from '../../auth/entity/refresh-token.entity';
import { UserDetail } from './user-detail.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: true,
  })
  refreshToken: RefreshToken;

  @OneToOne(() => UserDetail, (userDetail) => userDetail.user, {
    cascade: true,
  })
  userDetail: UserDetail;
}
