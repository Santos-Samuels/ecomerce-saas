import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateProductMaterialDto } from './create-product-material.dto';

export class UpdateProductMaterialDto extends PartialType(
  CreateProductMaterialDto,
) {
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
