import { ClientProxy } from '@nestjs/microservices';
import { UserService } from '../user/user.service';
import { ReadFollowMessageResponseDto } from './dto/res.dto';
export declare class FollowService {
    private client;
    private userService;
    constructor(client: ClientProxy, userService: UserService);
    createFollowMessage(userId: string, followId: string): Promise<string>;
    createFollower(userId: string, followerId: string): Promise<string>;
    readAllFollowMessage(userId: string): Promise<ReadFollowMessageResponseDto[]>;
}
