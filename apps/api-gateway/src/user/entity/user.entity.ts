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
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  username: string;

  @Column({ type: 'enum', enum: Provider })
  provider: Provider;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ nullable: true })
  providerId: string;
}
