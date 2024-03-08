export declare enum Gender {
    Male = "male",
    Female = "female"
}
export declare class SignupReqDto {
    username: string;
    email: string;
    password: string;
    confirm: string;
    gender: Gender;
    birthyear: number;
}
export declare class SigninReqDto {
    email: string;
    password: string;
}
