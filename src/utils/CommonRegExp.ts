
export const ENG_LETTERS_WITH_NUMBERS = 'a-zA-Z0-9'

export function createRegex (...regexes: string[]) {
  return new RegExp('^[' + regexes.join('') + ']+$');
}