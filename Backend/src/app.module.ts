import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { MapsModule } from './modules/maps/maps.module';
import { AuthModule } from './modules/auth/auth.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { StorageModule } from './modules/storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './config/.env' }),
    UsersModule,
    ResourcesModule,
    StorageModule,
    VehiclesModule,
    MapsModule,
    AuthModule,
  ],
})
export class AppModule {}
