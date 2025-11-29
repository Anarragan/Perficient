import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { Subject } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  private subject = new Subject<void>();

  getSubject() {
    return this.subject.asObservable();
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<any> {
    const vehicle = this.vehicleRepository.create({
      capacidad: createVehicleDto.capacidad,
      id_type: { id: createVehicleDto.id_type } as any,
      id_user: createVehicleDto.id_user ? { id: createVehicleDto.id_user } as any : null,
    });
    const saved = await this.vehicleRepository.save(vehicle);
    this.subject.next();
    return { success: true, message: 'Vehicle created successfully', data: saved };
  }

  async findAll(): Promise<any> {
    const vehicles = await this.vehicleRepository.find({ relations: ['id_type', 'id_user'] });
    return { success: true, data: vehicles };
  }

  async findOne(id: string): Promise<any> {
    const vehicle = await this.vehicleRepository.findOne({ 
      where: { id },
      relations: ['id_type', 'id_user']
    });
    if (vehicle) {
      return { success: true, data: vehicle };
    } else {
      return { success: false, message: 'Vehicle not found' };
    }
  }

  async findByUserId(userId: string): Promise<Vehicle[]> {
    return this.vehicleRepository.find({ 
      where: { id_user: { id: userId } },
      relations: ['id_type', 'id_user']
    });
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<any> {
    const updateData: any = {};
    if (updateVehicleDto.capacidad !== undefined) updateData.capacidad = updateVehicleDto.capacidad;
    if (updateVehicleDto.id_type) updateData.id_type = { id: updateVehicleDto.id_type };
    if (updateVehicleDto.id_user !== undefined) updateData.id_user = updateVehicleDto.id_user ? { id: updateVehicleDto.id_user } : null;
    
    await this.vehicleRepository.update(id, updateData);
    const updated = await this.findOne(id);
    if (updated.success) {
      this.subject.next();
      return { success: true, message: 'Vehicle updated successfully', data: updated.data };
    } else {
      return { success: false, message: 'Vehicle not found' };
    }
  }

  async remove(id: string): Promise<any> {
    const result = await this.vehicleRepository.delete(id);
    if (result.affected && result.affected > 0) {
      this.subject.next();
      return { success: true, message: 'Vehicle deleted successfully' };
    } else {
      return { success: false, message: 'Vehicle not found' };
    }
  }
}
