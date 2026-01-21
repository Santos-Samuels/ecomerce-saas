import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsString()
  @IsOptional()
  primaryColor?: string;

  @IsString()
  @IsOptional()
  instagramHandle?: string;

  @IsString()
  @IsNotEmpty()
  subdomain: string;
}
