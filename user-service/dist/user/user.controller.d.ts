import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe({ userId, }: {
        userId: string;
    }): Promise<{
        username: string;
        gender: string;
        birthyear: number;
    }>;
    findOneById({ userId }: {
        userId: string;
    }): Promise<{
        id: string;
    }>;
    findOneByEmail({ email }: {
        email: string;
    }): Promise<{
        id: string;
    }>;
    createUser({ email, password, }: {
        email: string;
        password: string;
    }): Promise<{
        id: string;
    }>;
    createUserDetail({ userId, username, gender, birthyear, }: {
        userId: string;
        username: string;
        gender: string;
        birthyear: number;
    }): Promise<{
        id: string;
    }>;
    validateUser({ email, password, }: {
        email: string;
        password: string;
    }): Promise<{
        id: string;
    }>;
}
