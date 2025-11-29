import { Injectable } from '@nestjs/common';
import { CreateStorageResourceDto } from './dto/create-storage_resource.dto';
import { UpdateStorageResourceDto } from './dto/update-storage_resource.dto';

@Injectable()
export class StorageResourcesService {
  create(createStorageResourceDto: CreateStorageResourceDto) {
    return 'This action adds a new storageResource';
  }

  findAll() {
    return `This action returns all storageResources`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storageResource`;
  }

  update(id: number, updateStorageResourceDto: UpdateStorageResourceDto) {
    return `This action updates a #${id} storageResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} storageResource`;
  }
}
