"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessages = void 0;
const dotenv = require("dotenv");
const codes_1 = require("../errorCodes/codes");
dotenv.config({ path: '.env' });
const generateMessages = (code, validator, type) => {
    const codes = JSON.parse(JSON.stringify(codes_1.responses));
    return codes[`${code}`];
};
exports.generateMessages = generateMessages;
//# sourceMappingURL=generateMessage.js.map