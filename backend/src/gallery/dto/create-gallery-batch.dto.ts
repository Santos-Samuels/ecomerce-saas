import { ArrayMaxSize, ArrayMinSize, IsArray, IsUrl } from 'class-validator';

export class CreateGalleryBatchDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsUrl({ require_protocol: true }, { each: true })
  urls: string[];
}
