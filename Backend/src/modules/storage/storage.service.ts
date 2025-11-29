import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { Storage } from './entities/storage.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageService {
  private storages: Storage[] = [];

  create(createStorageDto: CreateStorageDto): any {
    const storage: Storage = {
      id: randomUUID(),
      type: createStorageDto.type,
      lowlimit: createStorageDto.lowlimit,
      highlimit: createStorageDto.highlimit,
    };
    this.storages.push(storage);
    return { success: true, message: 'Storage created successfully', data: storage };
  }

  findAll(): any {
    return { success: true, data: this.storages };
  }

  findOne(id: string): any {
    const storage = this.storages.find(storage => storage.id === id);
    if (storage) {
      return { success: true, data: storage };
    } else {
      return { success: false, message: 'Storage not found' };
    }
  }

  update(id: string, updateStorageDto: UpdateStorageDto): any {
    const storage = this.storages.find(storage => storage.id === id);
    if (!storage) {
      return { success: false, message: 'Storage not found' };
    }
    if (updateStorageDto.type) storage.type = updateStorageDto.type;
    if (updateStorageDto.lowlimit !== undefined) storage.lowlimit = updateStorageDto.lowlimit;
    if (updateStorageDto.highlimit !== undefined) storage.highlimit = updateStorageDto.highlimit;
    return { success: true, message: 'Storage updated successfully', data: storage };
  }

  remove(id: string): any {
    const index = this.storages.findIndex(storage => storage.id === id);
    if (index === -1) {
      return { success: false, message: 'Storage not found' };
    }
    this.storages.splice(index, 1);
    return { success: true, message: 'Storage deleted successfully' };
  }
}
