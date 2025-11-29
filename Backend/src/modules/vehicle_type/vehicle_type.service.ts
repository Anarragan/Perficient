import { Injectable } from '@nestjs/common';
import { CreateVehicleTypeDto } from './dto/create-vehicle_type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from './entities/vehicle_type.entity';

@Injectable()
export class VehicleTypeService {
  constructor(
    @InjectRepository(VehicleType)
    private vehicleTypeRepository: Repository<VehicleType>,
  ) {}

  async create(createVehicleTypeDto: CreateVehicleTypeDto): Promise<any> {
    const vehicleType = this.vehicleTypeRepository.create(createVehicleTypeDto);
    const saved = await this.vehicleTypeRepository.save(vehicleType);
    return { success: true, message: 'Vehicle type created successfully', data: saved };
  }

  async findAll(): Promise<any> {
    const vehicleTypes = await this.vehicleTypeRepository.find();
    return { success: true, data: vehicleTypes };
  }

  async findOne(id: string): Promise<any> {
    const vehicleType = await this.vehicleTypeRepository.findOne({ where: { id } });
    if (vehicleType) {
      return { success: true, data: vehicleType };
    } else {
      return { success: false, message: 'Vehicle type not found' };
    }
  }

  async update(id: string, updateVehicleTypeDto: UpdateVehicleTypeDto): Promise<any> {
    const result = await this.vehicleTypeRepository.update(id, updateVehicleTypeDto);
    if (result.affected > 0) {
      const updated = await this.vehicleTypeRepository.findOne({ where: { id } });
      return { success: true, message: 'Vehicle type updated successfully', data: updated };
    } else {
      return { success: false, message: 'Vehicle type not found' };
    }
  }

  async remove(id: string): Promise<any> {
    const result = await this.vehicleTypeRepository.delete(id);
    if (result.affected > 0) {
      return { success: true, message: 'Vehicle type deleted successfully' };
    } else {
      return { success: false, message: 'Vehicle type not found' };
    }
  }
}
