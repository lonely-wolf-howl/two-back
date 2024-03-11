import { User } from '../../user/entity/user.entity';
export declare class Follow {
    id: string;
    followId: string;
    createdAt: Date;
    user: User;
}
