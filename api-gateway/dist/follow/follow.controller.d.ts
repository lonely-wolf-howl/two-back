import { UserAfterAuth } from '../common/decorator/user.decorator';
import { FollowService } from './follow.service';
export declare class FollowController {
    private followService;
    constructor(followService: FollowService);
    createFollowMessage(user: UserAfterAuth, followId: string): Promise<string>;
    acceptFollowRequest(user: UserAfterAuth, followerId: string): Promise<string>;
}
