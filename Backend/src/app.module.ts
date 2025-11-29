import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { StorageModule } from './modules/storage/storage.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { MapsModule } from './modules/maps/maps.module';
import { StorageModule } from './modules/storage/storage.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { MapsModule } from './modules/maps/maps.module';
import { ResourcesModule } from './modules/resources/resources.module';

@Module({
  imports: [UsersModule, ResourcesModule, StorageModule, VehiclesModule, MapsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
