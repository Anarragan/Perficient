import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class VehiclesService {
  private vehicles: Vehicle[] = [];

  create(createVehicleDto: CreateVehicleDto): any {
    const vehicle: Vehicle = {
      id: randomUUID(),
      capacidad: createVehicleDto.capacidad,
      id_type: createVehicleDto.id_type as any,
      id_user: createVehicleDto.id_user !== undefined ? ({ id: createVehicleDto.id_user } as any) : undefined,
    };
    this.vehicles.push(vehicle);
    return { success: true, message: 'Vehicle created successfully', data: vehicle };
  }

  findAll(): any {
    return { success: true, data: this.vehicles };
  }

  findOne(id: string): any {
    const vehicle = this.vehicles.find(vehicle => vehicle.id === id);
    if (vehicle) {
      return { success: true, data: vehicle };
    } else {
      return { success: false, message: 'Vehicle not found' };
    }
  }

  findByUserId(userId: string): Vehicle[] {
    return this.vehicles.filter(vehicle => vehicle.id_user?.id === userId);
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto): any {
    const vehicle = this.vehicles.find(vehicle => vehicle.id === id);
    if (!vehicle) {
      return { success: false, message: 'Vehicle not found' };
    }
    if (updateVehicleDto.capacidad !== undefined) vehicle.capacidad = updateVehicleDto.capacidad;
    if (updateVehicleDto.id_type) vehicle.id_type = updateVehicleDto.id_type as any;
    if (updateVehicleDto.id_user !== undefined) vehicle.id_user = ({ id: updateVehicleDto.id_user } as any);
    return vehicle;
  }

  remove(id: string): any {
    const index = this.vehicles.findIndex(vehicle => vehicle.id === id);
    if (index === -1) {
      return { success: false, message: 'Vehicle not found' };
    }
    this.vehicles.splice(index, 1);
    return { success: true, message: 'Vehicle deleted successfully' };
  }
}
