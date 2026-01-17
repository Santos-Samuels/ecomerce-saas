import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  ValidateIf,
} from 'class-validator';

export class CreateProductMaterialDto {
  @IsUUID()
  storeId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  colorName?: string;

  @ValidateIf(
    (o: CreateProductMaterialDto) => !!(o.colorName && o.colorName.length > 0),
  )
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message: 'colorHex must be a valid hex color (e.g., #000000)',
  })
  colorHex?: string;
}
