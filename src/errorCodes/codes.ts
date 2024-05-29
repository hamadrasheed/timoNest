export const statuses = {
    SUCCESS: 200,
    INVALID: 406,
    UNAUTHORIZED: 401,
    UNKOWN: 404,
};

export const responses = {
    AUTH_FAILED: {
        message: 'Auth failed',
        status: statuses.INVALID
    },
    USERNAME_NOT_FOUND: {
        message: 'No user exists with this username!',
        status: statuses.INVALID
    },
    EMAIL_NOT_FOUND: {
        message: 'User not found with this email!',
        status: statuses.INVALID
    },
    WRONG_PASSWORD: {
        message: 'Wrong Password!',
        status: statuses.INVALID
    },
    OLD_AND_NEW_PASSWORD_SAME: {
        message: 'The old password and the new password are the same.',
        status: statuses.INVALID
    },
    USER_EXISTS: {
        message: 'User already exists',
        status: statuses.INVALID
    },
    UNAUTHORIZED: {
        message: 'Unauthorized request!',
        status: statuses.UNAUTHORIZED
    },
    TOKEN_NOT_FOUND: {
        message: 'Token not provided!',
        status: statuses.UNAUTHORIZED
    },
    TOKEN_BLACKLISTED: {
        message: 'The token has been blacklisted, Please login again!',
        status: statuses.UNAUTHORIZED
    },
    UNAUTHORIZED_TOKEN: {
        message: 'Unauthorized! Token is not verified!',
        status: statuses.UNAUTHORIZED
    },
    INVALID_ROLE: {
        message: 'Unkown role is provided!',
        status: statuses.INVALID
    },
    UNKOWN_USER: {
        message: 'User not found!',
        status: statuses.INVALID
    },
    OTP_EXPIRED: {
        message: 'OTP is expired!',
        status: statuses.INVALID
    },
    INVALID_OTP: {
        message: 'Provided OTP is invalid!',
        status: statuses.INVALID
    },
    INVALID_LINK: {
        message: 'Invalid link.',
        status: statuses.INVALID
    },
};
