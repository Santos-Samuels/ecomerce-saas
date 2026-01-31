import { Module } from '@nestjs/common';
import { ProductMaterialService } from './product-material.service';
import { ProductMaterialController } from './product-material.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProductMaterialController],
  providers: [ProductMaterialService],
})
export class ProductMaterialModule {}
