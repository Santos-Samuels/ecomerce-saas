import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreLayoutDto } from './create-store-layout.dto';

export class UpdateStoreLayoutDto extends PartialType(CreateStoreLayoutDto) {}
