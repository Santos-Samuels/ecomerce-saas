import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateStoreLayoutDto {
  @IsString()
  storeId: string;

  @IsString()
  @IsOptional()
  heroTitle?: string;

  @IsString()
  @IsOptional()
  heroSubtitle?: string;

  @IsString()
  @IsOptional()
  heroButtonText?: string;

  @IsString()
  @IsOptional()
  heroButtonLink?: string;

  @IsString()
  @IsOptional()
  heroBackgroundImage?: string;

  @IsString()
  @IsOptional()
  aboutTitle?: string;

  @IsString()
  @IsOptional()
  aboutDescription?: string;

  @IsString()
  @IsOptional()
  aboutImage?: string;

  @IsBoolean()
  @IsOptional()
  showFeedbacks?: boolean;
}
