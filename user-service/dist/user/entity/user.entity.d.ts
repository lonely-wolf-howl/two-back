import { UserDetail } from './user-detail.entity';
import { Follower } from '../../follow/entity/follower.entity';
import { FollowMessage } from '../../follow/entity/follow-message.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    userDetail: UserDetail;
    follower: Follower[];
    followMessage: FollowMessage[];
}
