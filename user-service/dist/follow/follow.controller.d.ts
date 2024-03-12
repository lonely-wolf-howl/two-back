import { FollowService } from './follow.service';
import { FollowMessage } from './entity/follow-message.entity';
import { Follower } from './entity/follower.entity';
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
    readAllFollowMessagesToMe({ userId, }: {
        userId: string;
    }): Promise<{
        followMessages: FollowMessage[];
    }>;
    readAllFollowers({ userId, }: {
        userId: string;
    }): Promise<{
        followers: Follower[];
    }>;
    cancelFollowMessage({ userId, followId, }: {
        userId: string;
        followId: string;
    }): Promise<{
        id: string;
    }>;
    rejectFollowMessage({ userId, followerId, }: {
        userId: string;
        followerId: string;
    }): Promise<{
        id: string;
    }>;
}
