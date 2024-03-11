import { UserDetail } from './user-detail.entity';
import { Follow } from '../../follow/entity/follow.entity';
import { FollowMessage } from '../../follow/entity/follow-message.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    userDetail: UserDetail;
    follow: Follow[];
    followMessage: FollowMessage[];
}
