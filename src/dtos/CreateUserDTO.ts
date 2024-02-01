import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ENG_LETTERS_WITH_NUMBERS, createRegex } from "src/utils/CommonRegExp";
import { validationOptionsMsg } from "src/utils/ValidationMessage";

export class CreateUserDTO {

  @Matches(createRegex(ENG_LETTERS_WITH_NUMBERS))
  @IsString()
  @IsNotEmpty(validationOptionsMsg('Username must not be empty'))
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4, validationOptionsMsg('Password must be between 4 and 20 length'))
  @MaxLength(20, validationOptionsMsg('Password must be between 4 and 20 length'))
  password: string;
}