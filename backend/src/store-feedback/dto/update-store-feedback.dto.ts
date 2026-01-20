import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreFeedbackDto } from './create-store-feedback.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateStoreFeedbackDto extends PartialType(CreateStoreFeedbackDto) {
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
