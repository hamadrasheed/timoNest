"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responses = exports.statuses = void 0;
exports.statuses = {
    SUCCESS: 200,
    INVALID: 406,
    UNAUTHORIZED: 401,
    UNKOWN: 404,
};
exports.responses = {
    AUTH_FAILED: {
        message: 'Auth failed',
        status: exports.statuses.INVALID
    },
    USERNAME_NOT_FOUND: {
        message: 'No user exists with this username!',
        status: exports.statuses.INVALID
    },
    EMAIL_NOT_FOUND: {
        message: 'User not found with this email!',
        status: exports.statuses.INVALID
    },
    WRONG_PASSWORD: {
        message: 'Wrong Password!',
        status: exports.statuses.INVALID
    },
    OLD_AND_NEW_PASSWORD_SAME: {
        message: 'The old password and the new password are the same.',
        status: exports.statuses.INVALID
    },
    USER_EXISTS: {
        message: 'User already exists',
        status: exports.statuses.INVALID
    },
    UNAUTHORIZED: {
        message: 'Unauthorized request!',
        status: exports.statuses.UNAUTHORIZED
    },
    TOKEN_NOT_FOUND: {
        message: 'Token not provided!',
        status: exports.statuses.UNAUTHORIZED
    },
    TOKEN_BLACKLISTED: {
        message: 'The token has been blacklisted, Please login again!',
        status: exports.statuses.UNAUTHORIZED
    },
    UNAUTHORIZED_TOKEN: {
        message: 'Unauthorized! Token is not verified!',
        status: exports.statuses.UNAUTHORIZED
    },
    INVALID_ROLE: {
        message: 'Unkown role is provided!',
        status: exports.statuses.INVALID
    },
    UNKOWN_USER: {
        message: 'User not found!',
        status: exports.statuses.INVALID
    },
    OTP_EXPIRED: {
        message: 'OTP is expired!',
        status: exports.statuses.INVALID
    },
    INVALID_OTP: {
        message: 'Provided OTP is invalid!',
        status: exports.statuses.INVALID
    },
    INVALID_LINK: {
        message: 'Invalid link.',
        status: exports.statuses.INVALID
    },
};
//# sourceMappingURL=codes.js.map