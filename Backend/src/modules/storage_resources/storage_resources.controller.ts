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

  @Get(':idStorage/:idResource')
  findOne(@Param('idStorage') idStorage: string, @Param('idResource') idResource: string) {
    return this.storageResourcesService.findOne(idStorage, idResource);
  }

  @Patch(':idStorage/:idResource')
  update(@Param('idStorage') idStorage: string, @Param('idResource') idResource: string, @Body() updateStorageResourceDto: UpdateStorageResourceDto) {
    return this.storageResourcesService.update(idStorage, idResource, updateStorageResourceDto);
  }

  @Delete(':idStorage/:idResource')
  remove(@Param('idStorage') idStorage: string, @Param('idResource') idResource: string) {
    return this.storageResourcesService.remove(idStorage, idResource);
  }
}
