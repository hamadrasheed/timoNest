"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStrongPassword = exports.CustomPasswordValidator = void 0;
const class_validator_1 = require("class-validator");
let CustomPasswordValidator = class CustomPasswordValidator {
    validate(password, args) {
        if (password && password?.length < 8) {
            return false;
        }
        const letterRegex = /[a-zA-Z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!letterRegex.test(password) || !numberRegex.test(password) || !specialCharRegex.test(password)) {
            return false;
        }
        return true;
    }
    defaultMessage(args) {
        return 'Password must be at least 8 characters long and contain at least 1 letter, 1 number, and 1 special character';
    }
};
exports.CustomPasswordValidator = CustomPasswordValidator;
exports.CustomPasswordValidator = CustomPasswordValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'customPassword', async: false })
], CustomPasswordValidator);
function IsStrongPassword(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: CustomPasswordValidator,
        });
    };
}
exports.IsStrongPassword = IsStrongPassword;
//# sourceMappingURL=passwordValidator.js.map