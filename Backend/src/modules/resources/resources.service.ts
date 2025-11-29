import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from 'rxjs';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  private subject = new Subject<void>();

  getSubject() {
    return this.subject.asObservable();
  }

  async create(createResourceDto: CreateResourceDto): Promise<any> {
    const resource = this.resourceRepository.create(createResourceDto);
    const saved = await this.resourceRepository.save(resource);
    this.subject.next();
    return { success: true, message: 'Resource created successfully', data: saved };
  }

  async findAll(): Promise<any> {
    const resources = await this.resourceRepository.find();
    return { success: true, data: resources };
  }

  async findOne(id: string): Promise<any> {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (resource) {
      return { success: true, data: resource };
    } else {
      return { success: false, message: 'Resource not found' };
    }
  }

  async findByUserId(userId: string): Promise<Resource[]> {
    return this.resourceRepository.find({ where: { idUser: userId } });
  }

  async update(id: string, updateResourceDto: UpdateResourceDto): Promise<any> {
    await this.resourceRepository.update(id, updateResourceDto);
    const updated = await this.findOne(id);
    if (updated.success) {
      this.subject.next();
      return { success: true, message: 'Resource updated successfully', data: updated.data };
    } else {
      return { success: false, message: 'Resource not found' };
    }
  }

  async remove(id: string): Promise<any> {
    const result = await this.resourceRepository.delete(id);
    if (result.affected && result.affected > 0) {
      this.subject.next();
      return { success: true, message: 'Resource deleted successfully' };
    } else {
      return { success: false, message: 'Resource not found' };
    }
  }
}
