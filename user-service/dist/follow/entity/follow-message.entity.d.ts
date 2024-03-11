import { User } from '../../user/entity/user.entity';
export declare class FollowMessage {
    id: string;
    followId: string;
    createdAt: Date;
    user: User;
}
