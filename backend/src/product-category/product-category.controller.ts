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
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategory } from './product-category.entity';
import { ProductCategoryService } from './product-category.service';

@Controller('products/categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  @Roles(RoleById.Admin, RoleById.Staff)
  create(@Body() data: CreateProductCategoryDto): Promise<ProductCategory> {
    return this.productCategoryService.create(data);
  }

  @Get()
  @Public()
  findAll(@Req() req: AuthenticatedRequest): Promise<ProductCategory[]> {
    const tenantId = req.tenantId;
    const user = req.user;

    // Priority 1: Subdomain (Public access)
    if (tenantId) {
      return this.productCategoryService.findAll(tenantId);
    }

    // Priority 2: Token (Admin access)
    if (user?.storeId) {
      return this.productCategoryService.findAll(user.storeId);
    }

    throw new NotFoundException('Store context not found');
  }

  @Get(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  findOne(@Param('id') id: string): Promise<ProductCategory> {
    return this.productCategoryService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  update(
    @Param('id') id: string,
    @Body() data: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.productCategoryService.update(id, data);
  }

  @Delete(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  remove(@Param('id') id: string): Promise<void> {
    return this.productCategoryService.remove(id);
  }
}
