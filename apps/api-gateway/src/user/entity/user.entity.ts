import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from '../enum/user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  username: string;

  @Column({ type: 'enum', enum: Provider })
  provider: Provider;

  @Column({ nullable: true })
  providerId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
