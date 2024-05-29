"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const authToken_1 = require("../utils/authToken");
const authenticate = (req, res, next) => {
    try {
        const { headers: { authorization } } = req;
        const currentUserId = (0, authToken_1.authenticateToken)(authorization);
        req.body = {
            ...req.body,
            userId: currentUserId
        };
        req.query = {
            ...req.query,
            userId: `${currentUserId}`
        };
        next();
    }
    catch (error) {
        console.log('error in', error);
        return res.status(401).json({
            message: error?.message || 'Auth failed',
        });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map