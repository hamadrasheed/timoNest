export declare const statuses: {
    SUCCESS: number;
    INVALID: number;
    UNAUTHORIZED: number;
    UNKOWN: number;
};
export declare const responses: {
    AUTH_FAILED: {
        message: string;
        status: number;
    };
    USERNAME_NOT_FOUND: {
        message: string;
        status: number;
    };
    EMAIL_NOT_FOUND: {
        message: string;
        status: number;
    };
    WRONG_PASSWORD: {
        message: string;
        status: number;
    };
    OLD_AND_NEW_PASSWORD_SAME: {
        message: string;
        status: number;
    };
    USER_EXISTS: {
        message: string;
        status: number;
    };
    UNAUTHORIZED: {
        message: string;
        status: number;
    };
    TOKEN_NOT_FOUND: {
        message: string;
        status: number;
    };
    TOKEN_BLACKLISTED: {
        message: string;
        status: number;
    };
    UNAUTHORIZED_TOKEN: {
        message: string;
        status: number;
    };
    INVALID_ROLE: {
        message: string;
        status: number;
    };
    UNKOWN_USER: {
        message: string;
        status: number;
    };
    OTP_EXPIRED: {
        message: string;
        status: number;
    };
    INVALID_OTP: {
        message: string;
        status: number;
    };
    INVALID_LINK: {
        message: string;
        status: number;
    };
};
