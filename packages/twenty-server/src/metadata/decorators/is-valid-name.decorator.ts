import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidName',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return /^(?!(?:not|or|and)$)[^'\"\\;.=*/]+$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} has failed the name validation check`;
        },
      },
    });
  };
}
