import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { Storage } from './entities/storage.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageService {
  private storages: Storage[] = [];

  create(createStorageDto: CreateStorageDto): Storage {
    const storage: Storage = {
      id: randomUUID(),
      type: createStorageDto.type,
      lowlimit: createStorageDto.lowlimit,
      highlimit: createStorageDto.highlimit,
    };
    this.storages.push(storage);
    return storage;
  }

  findAll(): Storage[] {
    return this.storages;
  }

  findOne(id: string): Storage | undefined {
    return this.storages.find(storage => storage.id === id);
  }

  update(id: string, updateStorageDto: UpdateStorageDto): Storage | null {
    const storage = this.findOne(id);
    if (!storage) return null;
    if (updateStorageDto.type) storage.type = updateStorageDto.type;
    if (updateStorageDto.lowlimit !== undefined) storage.lowlimit = updateStorageDto.lowlimit;
    if (updateStorageDto.highlimit !== undefined) storage.highlimit = updateStorageDto.highlimit;
    return storage;
  }

  remove(id: string): boolean {
    const index = this.storages.findIndex(storage => storage.id === id);
    if (index === -1) return false;
    this.storages.splice(index, 1);
    return true;
  }
}
