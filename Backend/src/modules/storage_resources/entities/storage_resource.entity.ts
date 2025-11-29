import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Storage } from '../../storage/entities/storage.entity';
import { Resource } from '../../resources/entities/resource.entity';

@Entity({ name: 'storage_resources' })
export class StorageResource {
  @PrimaryColumn('uuid', { name: 'id_storage' })
  idStorage: string;

  @PrimaryColumn('uuid', { name: 'id_resource' })
  idResource: string;

  @ManyToOne(() => Storage, (storage) => storage.storageResources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_storage' })
  storage: Storage;

  @ManyToOne(() => Resource, (resource) => resource.storageResources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_resource' })
  resource: Resource;
}
