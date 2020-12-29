import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  password: string;
}
