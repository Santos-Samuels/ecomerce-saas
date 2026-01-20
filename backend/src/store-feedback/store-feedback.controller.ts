import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
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
  findAll(@Query('storeId') storeId: string) {
    return this.storeFeedbackService.findAll(storeId);
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
