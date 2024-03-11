import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './entity/chatRoom.entity';
import { Message } from './entity/message.entity';
import { ChatsGateway } from './chats.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, Message])],
  controllers: [],
  providers: [ChatsGateway],
})
export class ChatModule {}
