import { RoleById } from '@ecomerce/shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import type { AuthenticatedRequest } from '../common/types';
import { CreateProductMaterialDto } from './dto/create-product-material.dto';
import { UpdateProductMaterialDto } from './dto/update-product-material.dto';
import { ProductMaterial } from './product-material.entity';
import { ProductMaterialService } from './product-material.service';

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
  findAll(@Req() req: AuthenticatedRequest): Promise<ProductMaterial[]> {
    const tenantId = req.tenantId;
    const user = req.user;

    // Priority 1: Subdomain (Public access)
    if (tenantId) {
      return this.productMaterialService.findAll(tenantId);
    }

    // Priority 2: Token (Admin access)
    if (user?.storeId) {
      return this.productMaterialService.findAll(user.storeId);
    }

    throw new NotFoundException('Store context not found');
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
