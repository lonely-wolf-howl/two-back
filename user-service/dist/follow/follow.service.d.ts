import { Repository } from 'typeorm';
import { FollowMessage } from './entity/follow-message.entity';
export declare class FollowService {
    private readonly followMessageRepository;
    constructor(followMessageRepository: Repository<FollowMessage>);
    createFollowMessage(userId: string, followId: string): Promise<{
        id: string;
    }>;
}
