import { AuthService } from './auth.service';
import { UserAfterAuth } from '../common/decorator/user.decorator';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup({ username, email, password, confirm, gender, birthyear }: SignupReqDto): Promise<{
        userId: string;
        userDetailId: string;
    }>;
    signin({ email, password }: SigninReqDto): Promise<{
        accessToken: string;
        accessTokenExpiresIn: Date;
        refreshToken: string;
        refreshTokenExpiresIn: Date;
    }>;
    refresh(authorization: any, user: UserAfterAuth): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
