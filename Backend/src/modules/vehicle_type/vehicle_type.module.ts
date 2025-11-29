import { Module } from '@nestjs/common';
import { VehicleTypeService } from './vehicle_type.service';
import { VehicleTypeController } from './vehicle_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleType } from './entities/vehicle_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType])],
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService],
})
export class VehicleTypeModule {}
