"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jwt = require("jsonwebtoken");
const generateMessage_1 = require("./generateMessage");
const authenticateToken = (authorizationToken) => {
    try {
        if (!authorizationToken) {
            throw (0, generateMessage_1.generateMessages)('TOKEN_NOT_FOUND');
        }
        const tokenParse = authorizationToken?.split(' ');
        if (!tokenParse || !tokenParse[1]) {
            throw (0, generateMessage_1.generateMessages)('UNAUTHORIZED');
        }
        const token = tokenParse[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        }
        catch (error) {
            if (error?.message == 'jwt expired') {
                throw (0, generateMessage_1.generateMessages)('TOKEN_BLACKLISTED');
            }
            throw (0, generateMessage_1.generateMessages)('UNAUTHORIZED_TOKEN');
        }
        if (typeof decodedToken === 'string') {
            throw (0, generateMessage_1.generateMessages)('TOKEN_INVALID');
        }
        const currentDate = new Date().getTime() / 1000;
        if (currentDate > decodedToken.exp) {
            throw (0, generateMessage_1.generateMessages)('TOKEN_BLACKLISTED');
        }
        return decodedToken.id;
    }
    catch (error) {
        throw error;
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authToken.js.map