"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const user_model_1 = require("./user.model");
const role_model_1 = require("./role.model");
const userOtpInfo_model_1 = require("./userOtpInfo.model");
__exportStar(require("./user.model"), exports);
__exportStar(require("./role.model"), exports);
__exportStar(require("./userOtpInfo.model"), exports);
exports.models = [
    user_model_1.users,
    role_model_1.roles,
    userOtpInfo_model_1.userOtpInfo,
];
//# sourceMappingURL=index.js.map