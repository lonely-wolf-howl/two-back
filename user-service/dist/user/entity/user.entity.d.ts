import { UserDetail } from './user-detail.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    userDetail: UserDetail;
}
