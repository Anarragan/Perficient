import { Injectable } from '@nestjs/common';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { Map } from './entities/map.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class MapsService {
  private maps: Map[] = [];

  create(createMapDto: CreateMapDto): Map {
    const map: Map = {
      id: randomUUID(),
      url: createMapDto.url,
      description: createMapDto.description,
    };
    this.maps.push(map);
    return map;
  }

  findAll(): Map[] {
    return this.maps;
  }

  findOne(id: string): Map | undefined {
    return this.maps.find(map => map.id === id);
  }

  update(id: string, updateMapDto: UpdateMapDto): Map | null {
    const map = this.findOne(id);
    if (!map) return null;
    if (updateMapDto.url) map.url = updateMapDto.url;
    if (updateMapDto.description !== undefined) map.description = updateMapDto.description;
    return map;
  }

  remove(id: string): boolean {
    const index = this.maps.findIndex(map => map.id === id);
    if (index === -1) return false;
    this.maps.splice(index, 1);
    return true;
  }
}
