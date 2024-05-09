export const statuses = {
    INVALID: 406,
    RADIUS: 1000,
    SUCCESS: 200,
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
    }
};
