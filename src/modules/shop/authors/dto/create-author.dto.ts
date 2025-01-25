import { IsString, IsOptional, IsArray, IsDate, IsUrl, IsUUID } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsDate()
  dateOfDeath?: Date;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  books?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  awards?: string[];

  @IsOptional()
  @IsUrl()
  photo?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  socialMediaLinks?: {
    icon : string,
    link : string
  }[];

  @IsOptional()
  @IsString()
  slug?: string;
}
