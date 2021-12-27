import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsGreaterThanGenerator(
  generator: () => any,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsGreaterThanGenerator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const relatedValue = generator();
          return value > relatedValue;
        },
      },
    });
  };
}

export function IsLessThanGenerator(
  generator: () => any,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsLessThanGenerator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const relatedValue = generator();
          return value < relatedValue;
        },
      },
    });
  };
}
