import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class ResourcesService {
  private resources: Resource[] = [];

  create(createResourceDto: CreateResourceDto): Resource {
    const resource: Resource = {
      id: randomUUID(),
      name: createResourceDto.name,
      description: createResourceDto.description,
      quantity: createResourceDto.quantity,
      id_user: createResourceDto.id_user,
    };
    this.resources.push(resource);
    return resource;
  }

  findAll(): Resource[] {
    return this.resources;
  }

  findOne(id: string): Resource | undefined {
    return this.resources.find(resource => resource.id === id);
  }

  update(id: string, updateResourceDto: UpdateResourceDto): Resource | null {
    const resource = this.findOne(id);
    if (!resource) return null;
    if (updateResourceDto.name) resource.name = updateResourceDto.name;
    if (updateResourceDto.description !== undefined) resource.description = updateResourceDto.description;
    if (updateResourceDto.quantity !== undefined) resource.quantity = updateResourceDto.quantity;
    if (updateResourceDto.id_user !== undefined) resource.id_user = updateResourceDto.id_user;
    return resource;
  }

  remove(id: string): boolean {
    const index = this.resources.findIndex(resource => resource.id === id);
    if (index === -1) return false;
    this.resources.splice(index, 1);
    return true;
  }
}
