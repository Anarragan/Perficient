import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StorageResourcesService } from './storage_resources.service';
import { CreateStorageResourceDto } from './dto/create-storage_resource.dto';
import { UpdateStorageResourceDto } from './dto/update-storage_resource.dto';
import { ApiSecurity, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('storage-resources')
@UseGuards(JwtAuthGuard)
@ApiSecurity('api-key')
@ApiBearerAuth('JWT')
export class StorageResourcesController {
  constructor(private readonly storageResourcesService: StorageResourcesService) {}

  @Post()
  create(@Body() createStorageResourceDto: CreateStorageResourceDto) {
    return this.storageResourcesService.create(createStorageResourceDto);
  }

  @Get()
  findAll() {
    return this.storageResourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storageResourcesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStorageResourceDto: UpdateStorageResourceDto) {
    return this.storageResourcesService.update(+id, updateStorageResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storageResourcesService.remove(+id);
  }
}
