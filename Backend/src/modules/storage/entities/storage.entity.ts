import { StorageResource } from '../../storage_resources/entities/storage_resource.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'storage' })
export class Storage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  type: string;

  @Column('integer')
  lowlimit: number;

  @Column('integer')
  highlimit: number;

  @OneToMany(() => StorageResource, (sr) => sr.storage)
  storageResources?: StorageResource[];

}
