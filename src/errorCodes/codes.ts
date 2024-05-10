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
    EMAIL_NOT_FOUND: {
        message: 'User not found with this email!',
        status: statuses.INVALID
    },
    WRONG_PASSWORD: {
        message: 'Wrong Password!',
        status: statuses.INVALID
    },
    EMAIL_EXISTS: {
        message: 'User already exists with this email!',
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
        message: 'The token has been blacklisted',
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
};
