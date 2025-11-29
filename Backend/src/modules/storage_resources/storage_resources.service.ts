import { Injectable } from '@nestjs/common';
import { CreateStorageResourceDto } from './dto/create-storage_resource.dto';
import { UpdateStorageResourceDto } from './dto/update-storage_resource.dto';

@Injectable()
export class StorageResourcesService {
  create(createStorageResourceDto: CreateStorageResourceDto) {
    return { success: true, message: 'Storage resource created successfully' };
  }

  findAll() {
    return { success: true, data: [] };
  }

  findOne(id: number) {
    return { success: false, message: 'Storage resource not found' };
  }

  update(id: number, updateStorageResourceDto: UpdateStorageResourceDto) {
    return { success: true, message: 'Storage resource updated successfully' };
  }

  remove(id: number) {
    return { success: true, message: 'Storage resource deleted successfully' };
  }
}
