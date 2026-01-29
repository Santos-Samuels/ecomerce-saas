import { IsOptional, IsString } from 'class-validator';

export class FilterProductDto {
  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  vehicleId?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
