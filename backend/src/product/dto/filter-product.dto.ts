import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ToBoolean } from '../../common/decorators/to-boolean.decorator';

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

  @IsOptional()
  @IsBoolean()
  @ToBoolean()
  featured?: boolean;
}
