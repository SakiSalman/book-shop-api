import { IsString, IsOptional, IsMongoId, isNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsOptional()
  slug: string;
  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  icon?: File | string | null

  @IsOptional()
  @IsMongoId()
  readonly parentCategory?: string;
}
