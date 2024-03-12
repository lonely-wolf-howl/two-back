import { User } from '../../user/entity/user.entity';
export declare class Follower {
    id: string;
    followerId: string;
    createdAt: Date;
    user: User;
}
