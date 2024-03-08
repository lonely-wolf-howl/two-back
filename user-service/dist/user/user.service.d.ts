import { User } from './entity/user.entity';
import { UserDetail } from './entity/user-detail.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    private readonly userDetailRepository;
    constructor(userRepository: Repository<User>, userDetailRepository: Repository<UserDetail>);
    getMe(userId: string): Promise<{
        username: string;
        gender: string;
        birthyear: number;
    }>;
    findOneByEmail(email: string): Promise<{
        id: string;
    }>;
    createUser(email: string, password: string): Promise<{
        id: string;
    }>;
    createUserDetail(userId: any, username: any, gender: any, birthyear: any): Promise<{
        id: string;
    }>;
    validate(email: string, password: string): Promise<{
        id: string;
    }>;
}
