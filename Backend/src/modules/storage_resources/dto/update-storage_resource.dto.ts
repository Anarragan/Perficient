import { PartialType } from '@nestjs/mapped-types';
import { CreateStorageResourceDto } from './create-storage_resource.dto';

export class UpdateStorageResourceDto extends PartialType(CreateStorageResourceDto) {}
