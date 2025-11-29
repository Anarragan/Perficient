import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { StorageResource } from '../storage_resources/entities/storage_resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, StorageResource])],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [TypeOrmModule]
})
export class ResourcesModule {}
