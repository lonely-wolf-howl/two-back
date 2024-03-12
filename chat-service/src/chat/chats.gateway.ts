import { Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entity/message.entity';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@WebSocketGateway(8080, {
  transports: ['websocket'],
  namespace: 'chats',
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('CHAT-SERVICE');

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {
    this.logger.log('constructor');
  }

  afterInit() {
    this.logger.log('init');
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected: ${socket.id} ${socket.nsp.name}`);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected: ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('message')
  async handleSubmitChat(@MessageBody() { message }: { message: string }) {
    console.log('MESSAGE FROM CLIENT:', message);
  }
}
