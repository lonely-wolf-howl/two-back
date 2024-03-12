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
    acceptFollowRequest(userId: string, followerId: string): Promise<{
        id: string;
    }>;
    findFollowMessageByIds(userId: string, followId: string): Promise<FollowMessage>;
}
