import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateStoreFeedbackDto {
  @IsString()
  @IsNotEmpty()
  storeId: string;

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  stars?: number;
}
