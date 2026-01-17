import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductMaterialService } from './product-material.service';
import { CreateProductMaterialDto } from './dto/create-product-material.dto';
import { UpdateProductMaterialDto } from './dto/update-product-material.dto';
import { ProductMaterial } from './product-material.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleById } from '@ecomerce/shared';
import { Public } from '../auth/public.decorator';

@Controller('products/materials')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductMaterialController {
  constructor(
    private readonly productMaterialService: ProductMaterialService,
  ) {}

  @Post()
  @Roles(RoleById.Admin, RoleById.Staff)
  create(@Body() data: CreateProductMaterialDto): Promise<ProductMaterial> {
    return this.productMaterialService.create(data);
  }

  @Get()
  @Public()
  findAll(@Query('storeId') storeId?: string): Promise<ProductMaterial[]> {
    return this.productMaterialService.findAll(storeId);
  }

  @Get(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  findOne(@Param('id') id: string): Promise<ProductMaterial> {
    return this.productMaterialService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  update(
    @Param('id') id: string,
    @Body() data: UpdateProductMaterialDto,
  ): Promise<ProductMaterial> {
    return this.productMaterialService.update(id, data);
  }

  @Delete(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  remove(@Param('id') id: string): Promise<void> {
    return this.productMaterialService.remove(id);
  }
}
