import { UserAfterAuth } from '../common/decorator/user.decorator';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: UserAfterAuth): Promise<{
        username: string;
        gender: string;
        birthyear: number;
    }>;
}
