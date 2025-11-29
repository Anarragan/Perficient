import { Injectable } from '@nestjs/common';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { Map } from './entities/map.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class MapsService {
  private maps: Map[] = [];

  create(createMapDto: CreateMapDto): any {
    const map: Map = {
      id: randomUUID(),
      url: createMapDto.url,
      description: createMapDto.description,
    };
    this.maps.push(map);
    return { success: true, message: 'Map created successfully', data: map };
  }

  findAll(): any {
    return { success: true, data: this.maps };
  }

  findOne(id: string): any {
    const map = this.maps.find(map => map.id === id);
    if (map) {
      return { success: true, data: map };
    } else {
      return { success: false, message: 'Map not found' };
    }
  }

  update(id: string, updateMapDto: UpdateMapDto): any {
    const map = this.maps.find(map => map.id === id);
    if (!map) {
      return { success: false, message: 'Map not found' };
    }
    if (updateMapDto.url) map.url = updateMapDto.url;
    if (updateMapDto.description !== undefined) map.description = updateMapDto.description;
    return { success: true, message: 'Map updated successfully', data: map };
  }

  remove(id: string): any {
    const index = this.maps.findIndex(map => map.id === id);
    if (index === -1) {
      return { success: false, message: 'Map not found' };
    }
    this.maps.splice(index, 1);
    return { success: true, message: 'Map deleted successfully' };
  }
}
