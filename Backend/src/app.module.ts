import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { MapsModule } from './modules/maps/maps.module';
import { AuthModule } from './modules/auth/auth.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { StorageModule } from './modules/storage/storage.module';
import { DatabaseConfigModule } from './database/db.config';
import { NasaModule } from './modules/nasa/nasa.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './src/config/.env' }),
    DatabaseConfigModule,
    UsersModule,
    ResourcesModule,
    StorageModule,
    VehiclesModule,
    MapsModule,
    AuthModule,
    NasaModule,
  ],
})
export class AppModule {}
