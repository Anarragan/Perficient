import { Injectable } from '@nestjs/common';
import { CreateStorageResourceDto } from './dto/create-storage_resource.dto';
import { UpdateStorageResourceDto } from './dto/update-storage_resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageResource } from './entities/storage_resource.entity';

@Injectable()
export class StorageResourcesService {
  constructor(
    @InjectRepository(StorageResource)
    private storageResourceRepository: Repository<StorageResource>,
  ) {}

  async create(createStorageResourceDto: CreateStorageResourceDto): Promise<any> {
    const storageResource = this.storageResourceRepository.create({
      idStorage: createStorageResourceDto.idStorage,
      idResource: createStorageResourceDto.idResource,
    });
    try {
      await this.storageResourceRepository.save(storageResource);
      return { success: true, message: 'Storage resource created successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to create storage resource' };
    }
  }

  async findAll(): Promise<any> {
    const storageResources = await this.storageResourceRepository.find({
      relations: ['storage', 'resource'],
    });
    return { success: true, data: storageResources };
  }

  async findOne(idStorage: string, idResource: string): Promise<any> {
    const storageResource = await this.storageResourceRepository.findOne({
      where: { idStorage, idResource },
      relations: ['storage', 'resource'],
    });
    if (storageResource) {
      return { success: true, data: storageResource };
    } else {
      return { success: false, message: 'Storage resource not found' };
    }
  }

  async update(idStorage: string, idResource: string, updateStorageResourceDto: UpdateStorageResourceDto): Promise<any> {
    // Since it's a composite key, update might not make sense, but perhaps change quantities or something.
    // For now, assume no update needed, or implement if dto has fields.
    return { success: false, message: 'Update not supported for composite key' };
  }

  async remove(idStorage: string, idResource: string): Promise<any> {
    const result = await this.storageResourceRepository.delete({ idStorage, idResource });
    if (result && result.affected && result.affected > 0) {
      return { success: true, message: 'Storage resource deleted successfully' };
    } else {
      return { success: false, message: 'Storage resource not found' };
    }
  }
}
