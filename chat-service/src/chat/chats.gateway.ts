import { Socket, Server } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
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

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('init');
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`SOCKET CONNECTED: ${socket.id}`);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`SOCKET DISCONNECTED: ${socket.id}`);
  }

  @SubscribeMessage('join')
  async handleJoinRoom(
    @MessageBody() { roomId }: { roomId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(roomId);
    this.logger.log(`SOCKET(${socket.id}) JOINED ROOM(${roomId})`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody()
    {
      message,
      userId,
    }: {
      message: string;
      userId: string;
    },
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.log(`MESSAGE FROM USER(${userId}): ${message}`);
    socket.broadcast.emit('message', { message, userId });
  }
}
