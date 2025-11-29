import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleTypeService } from './vehicle_type.service';
import { CreateVehicleTypeDto } from './dto/create-vehicle_type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle_type.dto';

@Controller('vehicle-type')
export class VehicleTypeController {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @Post()
  create(@Body() createVehicleTypeDto: CreateVehicleTypeDto) {
    return this.vehicleTypeService.create(createVehicleTypeDto);
  }

  @Get()
  findAll() {
    return this.vehicleTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleTypeDto: UpdateVehicleTypeDto) {
    return this.vehicleTypeService.update(id, updateVehicleTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleTypeService.remove(id);
  }
}
