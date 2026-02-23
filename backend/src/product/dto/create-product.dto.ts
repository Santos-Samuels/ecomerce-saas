import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductColorDto {
  @IsString()
  name: string;

  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message: 'hex must be a valid hex color (e.g., #000000)',
  })
  hex: string;
}

export class CreateProductDto {
  @IsUUID()
  storeId: string;

  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  promotionalPrice?: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsBoolean()
  @IsOptional()
  infiniteStock?: boolean;

  @IsString()
  sku: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsUUID()
  categoryId: string;

  @IsUUID()
  @IsOptional()
  materialId?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  compatibleVehicleIds?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductColorDto)
  @ArrayMaxSize(5)
  @IsOptional()
  colors?: ProductColorDto[];
}
