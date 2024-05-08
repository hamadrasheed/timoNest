import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';

@ValidatorConstraint({ name: 'customPassword', async: false })
export class CustomPasswordValidator implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments) {
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

    defaultMessage(args: ValidationArguments) {
        return 'Password must be at least 8 characters long and contain at least 1 letter, 1 number, and 1 special character';
    }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: CustomPasswordValidator,
        });
    };
}
