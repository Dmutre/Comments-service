import { BadRequestException } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: true })
export class HtmlTagValidator implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    const allowedTags = ['a', 'code', 'i', 'strong', 'ahref=""title=""'];

    // Перевірка на заборонені теги
    const forbiddenTags = text.match(/<\/?([a-z][a-z0-9]*)(\s[^>]*)?>/gi)
      ?.map(tag => tag.replace(/<\/?|\s|>/g, ''))
      .filter(tag => !allowedTags.includes(tag));

    if (forbiddenTags?.length) {
      throw new BadRequestException(`Заборонені теги: ${forbiddenTags.join(', ')}`);
    }

    // Перевірка на закритість тегів
    const openedTags = [];
    const tags = text.match(/<(\/?)([a-z][a-z0-9]*)(\s[^>]*)?>/gi);

    if (tags) {
      for (const tag of tags) {
        const tagName = tag.replace(/<\/?|\s|>/g, '');

        if (!tag.includes('/')) {  // Відкритий тег
          openedTags.push(tagName);
        } else {  // Закритий тег
          if (!openedTags.length || openedTags[openedTags.length - 1] !== tagName) {
            throw new BadRequestException(`Тег <${tagName}> закритий перед відкриттям`);
          }
          openedTags.pop();
        }
      }
    }

    if (openedTags.length) {
      throw new BadRequestException(`Тег <${openedTags[openedTags.length - 1]}> не закритий`);
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Текст містить недопустимі HTML-теги або незакриті теги';
  }
}
