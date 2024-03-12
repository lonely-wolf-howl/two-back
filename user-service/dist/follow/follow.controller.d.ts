import { FollowService } from './follow.service';
import { FollowMessage } from './entity/follow-message.entity';
export declare class FollowController {
    private followService;
    constructor(followService: FollowService);
    createFollowMessage({ userId, followId, }: {
        userId: string;
        followId: string;
    }): Promise<{
        id: string;
    }>;
    createFollower({ userId, followerId, }: {
        userId: string;
        followerId: string;
    }): Promise<{
        id: string;
    }>;
    readAllFollowMessage({ userId, }: {
        userId: string;
    }): Promise<{
        followMessages: FollowMessage[];
    }>;
}
