import { Socket, Server } from 'socket.io';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { Message } from './entity/message.entity';
export declare class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly messageRepository;
    private logger;
    constructor(messageRepository: Repository<Message>);
    server: Server;
    afterInit(): void;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): Promise<void>;
    handleJoinRoom({ roomId }: {
        roomId: string;
    }, socket: Socket): Promise<void>;
    handleMessage({ message, userId, }: {
        message: string;
        userId: string;
    }, socket: Socket): Promise<void>;
}
