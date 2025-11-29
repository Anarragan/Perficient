import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleType } from '../vehicle_type/entities/vehicle_type.entity';
import { User } from '../users/entities/user.entity';
import { VehicleTypeModule } from '../vehicle_type/vehicle_type.module';
import { UsersModule } from '../users/users.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle, VehicleType, User]),
  forwardRef(() => UsersModule),
  forwardRef(() => VehicleTypeModule),
],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
