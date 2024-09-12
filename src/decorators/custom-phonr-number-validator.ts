import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import {
  getCountries,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';

export function CustomPhoneValidator(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'customPhone',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const countryCode = (args.object as any)['countryCode']; // Extract countryCode from the object
          console.log(value, countryCode);
          const cleanedValue = value.replace(/[\s-+]/g, '');
          const testValidation = /^\d+$/.test(cleanedValue);
          const RegionCodeArray = getCountries();
          if (
            !countryCode ||
            !RegionCodeArray.includes(countryCode) ||
            !testValidation
          ) {
            return false; // Country code is required and must be valid
          }

          try {
            return isValidPhoneNumber(cleanedValue, countryCode);
          } catch (error) {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `Invalid phone number or country code`;
        },
      },
    });
  };
}
