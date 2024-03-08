import { ClientProxy } from '@nestjs/microservices';
export declare class UserService {
    private client;
    constructor(client: ClientProxy);
    getMe(userId: string): Promise<{
        username: string;
        gender: string;
        birthyear: number;
    }>;
    findOneByEmail(email: string): Promise<string>;
    createUser(email: string, password: string): Promise<string>;
    createUserDetail(userId: string, username: string, gender: string, birthyear: number): Promise<string>;
    validateUser(email: string, password: string): Promise<string>;
}
