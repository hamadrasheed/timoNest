import { ValidatorConstraintInterface, ValidationArguments, ValidationOptions } from 'class-validator';
export declare class CustomPasswordValidator implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsStrongPassword(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
