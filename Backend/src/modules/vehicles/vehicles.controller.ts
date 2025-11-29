import { Controller, Get, Post, Body, Patch, Param, Delete, Sse, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Observable, of } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { ApiSecurity, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vehicles')
@UseGuards(JwtAuthGuard)
@ApiSecurity('api-key')
@ApiBearerAuth('JWT')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }

  @Sse('user/:userId/stream')
  streamUserVehicles(@Param('userId') userId: string): Observable<MessageEvent> {
    return this.vehiclesService.getSubject().pipe(
      startWith(null),
      switchMap(() => {
        const vehicles = this.vehiclesService.findByUserId(userId);
        return of({ data: vehicles } as MessageEvent);
      }),
    );
  }
}
