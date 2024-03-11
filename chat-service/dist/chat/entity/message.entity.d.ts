import { ChatRoom } from './chatRoom.entity';
export declare class Message {
    id: string;
    from: string;
    message: string;
    createdAt: Date;
    chatRoom: ChatRoom;
}
