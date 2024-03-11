import { FollowService } from './follow.service';
export declare class FollowController {
    private followService;
    constructor(followService: FollowService);
    createFollowMessage({ userId, followId, }: {
        userId: string;
        followId: string;
    }): Promise<{
        id: string;
    }>;
}
