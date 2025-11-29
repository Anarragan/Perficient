import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class VehiclesService {
  private vehicles: Vehicle[] = [];

  create(createVehicleDto: CreateVehicleDto): Vehicle {
    const vehicle: Vehicle = {
      id: randomUUID(),
      capacidad: createVehicleDto.capacidad,
      id_type: createVehicleDto.id_type,
      id_user: createVehicleDto.id_user,
    };
    this.vehicles.push(vehicle);
    return vehicle;
  }

  findAll(): Vehicle[] {
    return this.vehicles;
  }

  findOne(id: string): Vehicle | undefined {
    return this.vehicles.find(vehicle => vehicle.id === id);
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto): Vehicle | null {
    const vehicle = this.findOne(id);
    if (!vehicle) return null;
    if (updateVehicleDto.capacidad !== undefined) vehicle.capacidad = updateVehicleDto.capacidad;
    if (updateVehicleDto.id_type) vehicle.id_type = updateVehicleDto.id_type;
    if (updateVehicleDto.id_user !== undefined) vehicle.id_user = updateVehicleDto.id_user;
    return vehicle;
  }

  remove(id: string): boolean {
    const index = this.vehicles.findIndex(vehicle => vehicle.id === id);
    if (index === -1) return false;
    this.vehicles.splice(index, 1);
    return true;
  }
}
