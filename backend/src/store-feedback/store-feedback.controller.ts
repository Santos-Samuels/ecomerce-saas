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
import { StoreFeedbackService } from './store-feedback.service';
import { CreateStoreFeedbackDto } from './dto/create-store-feedback.dto';
import { UpdateStoreFeedbackDto } from './dto/update-store-feedback.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleById } from '@ecomerce/shared';
import { Public } from '../auth/public.decorator';

@Controller('store/feedbacks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StoreFeedbackController {
  constructor(private readonly storeFeedbackService: StoreFeedbackService) {}

  @Post()
  @Roles(RoleById.Admin, RoleById.Staff)
  create(@Body() createStoreFeedbackDto: CreateStoreFeedbackDto) {
    return this.storeFeedbackService.create(createStoreFeedbackDto);
  }

  @Get()
  @Public()
  findAll(@Req() req: Request) {
    const tenantId = (req as any).tenantId;
    const user = (req as any).user;

    // Priority 1: Subdomain (Public access)
    if (tenantId) {
      return this.storeFeedbackService.findAll(tenantId);
    }

    // Priority 2: Token (Admin access)
    if (user?.storeId) {
      return this.storeFeedbackService.findAll(user.storeId);
    }

    throw new NotFoundException('Store context not found');
  }

  @Get(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  findOne(@Param('id') id: string) {
    return this.storeFeedbackService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  update(
    @Param('id') id: string,
    @Body() updateStoreFeedbackDto: UpdateStoreFeedbackDto,
  ) {
    return this.storeFeedbackService.update(id, updateStoreFeedbackDto);
  }

  @Delete(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  remove(@Param('id') id: string) {
    return this.storeFeedbackService.remove(id);
  }
}
