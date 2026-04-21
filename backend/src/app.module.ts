import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GalleryModule } from './gallery/gallery.module';
import { ImageKitModule } from './imagekit/imagekit.module';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { PermissionModule } from './permission/permission.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductMaterialModule } from './product-material/product-material.module';
import { ProductModule } from './product/product.module';
import { RoleModule } from './role/role.module';
import { StoreFeedbackModule } from './store-feedback/store-feedback.module';
import { StoreLayoutModule } from './store-layout/store-layout.module';
import { StoreModule } from './store/store.module';
import { UserModule } from './user/user.module';
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
    StoreFeedbackModule,
    StoreLayoutModule,
    ImageKitModule,
    PermissionModule,
    GalleryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
