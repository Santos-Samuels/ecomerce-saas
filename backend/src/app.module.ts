import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StoreModule } from './store/store.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductMaterialModule } from './product-material/product-material.module';
import { ProductModule } from './product/product.module';
import { ImageKitModule } from './imagekit/imagekit.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    PrismaModule,
    StoreModule,
    RoleModule,
    UserModule,
    AuthModule,
    ProductCategoryModule,
    ProductMaterialModule,
    ProductModule,
    VehicleModule,
    ImageKitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
