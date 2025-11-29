import { StorageResource } from '../../storage_resources/entities/storage_resource.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'resources' })
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description?: string | null;

  @Column('integer', { default: 0 })
  quantity: number;

  // relations
  @Column({ name: 'id_user', type: 'uuid', nullable: true })
  idUser?: string | null;

  @OneToMany(() => StorageResource, (sr) => sr.resource)
  storageResources?: StorageResource[];
}
