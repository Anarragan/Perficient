import { Module } from '@nestjs/common';
import { StorageResourcesService } from './storage_resources.service';
import { StorageResourcesController } from './storage_resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageResource } from './entities/storage_resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StorageResource])],
  controllers: [StorageResourcesController],
  providers: [StorageResourcesService],
})
export class StorageResourcesModule {}
