import { Repository } from 'typeorm';
import { FollowMessage } from './entity/follow-message.entity';
import { Follower } from './entity/follower.entity';
export declare class FollowService {
    private readonly followMessageRepository;
    private readonly followerRepository;
    constructor(followMessageRepository: Repository<FollowMessage>, followerRepository: Repository<Follower>);
    createFollowMessage(userId: string, followId: string): Promise<{
        id: string;
    }>;
    createFollower(userId: string, followerId: string): Promise<{
        id: string;
    }>;
    readAllFollowMessagesToMe(userId: string): Promise<{
        followMessages: FollowMessage[];
    }>;
    readAllFollowers(userId: string): Promise<{
        followers: Follower[];
    }>;
    cancelFollowMessage(userId: string, followId: string): Promise<{
        id: string;
    }>;
    rejectFollowMessage(userId: string, followerId: string): Promise<{
        id: string;
    }>;
    deleteFollower(userId: string, followerId: string): Promise<{
        id: string;
    }>;
    findFollowMessageByIds(userId: string, followId: string): Promise<FollowMessage>;
    findFollowerByIds(userId: string, followerId: string): Promise<Follower>;
}
