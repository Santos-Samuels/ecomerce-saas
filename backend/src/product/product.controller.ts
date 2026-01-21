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
import type { Request } from 'express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleById } from '@ecomerce/shared';
import { Public } from '../auth/public.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(RoleById.Admin, RoleById.Staff)
  create(@Body() data: CreateProductDto): Promise<Product> {
    return this.productService.create(data);
  }

  @Get()
  @Public()
  findAll(@Req() req: Request): Promise<Product[]> {
    const tenantId = (req as any).tenantId;
    const user = (req as any).user;

    // Priority 1: Subdomain (Public access)
    if (tenantId) {
      return this.productService.findAll(tenantId);
    }

    // Priority 2: Token (Admin access)
    if (user?.storeId) {
      return this.productService.findAll(user.storeId);
    }

    throw new NotFoundException('Store context not found');
  }

  @Get(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }
}
