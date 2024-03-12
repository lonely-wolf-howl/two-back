import { ClientProxy } from '@nestjs/microservices';
import { UserService } from '../user/user.service';
export declare class FollowService {
    private client;
    private userService;
    constructor(client: ClientProxy, userService: UserService);
    createFollowMessage(userId: string, followId: string): Promise<string>;
    acceptFollowRequest(userId: string, followerId: string): Promise<string>;
}
