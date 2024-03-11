import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatRoom } from './chatRoom.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  from: string;

  @Column({
    nullable: false,
  })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.message, {
    cascade: true,
  })
  @JoinColumn()
  chatRoom: ChatRoom;
}
