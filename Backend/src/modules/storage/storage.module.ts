import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from '../storage/storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storage } from './entities/storage.entity';
import { StorageResource } from '../storage_resources/entities/storage_resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Storage, StorageResource])],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [TypeOrmModule]
})
export class StorageModule {}
