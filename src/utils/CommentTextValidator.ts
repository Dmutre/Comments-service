import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isValidHTML', async: false })
class IsValidHTMLConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    const regex = /<([a-z]+)(?![^>]*\/>)[^>]*>/g;
    const unmatchedTags = value.match(regex);
    return !unmatchedTags || unmatchedTags.length === 0;
  }
}

export function IsValidHTML(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidHTMLConstraint,
    });
  };
}
