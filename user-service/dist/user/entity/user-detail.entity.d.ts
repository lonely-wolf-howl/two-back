import { User } from './user.entity';
export declare class UserDetail {
    id: string;
    username: string;
    gender: string;
    birthyear: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
