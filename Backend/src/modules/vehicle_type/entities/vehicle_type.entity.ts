import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity({ name: 'vehicle_type' })
export class VehicleType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description?: string | null;

  @OneToMany(() => Vehicle, (v) => v.id_type)
  vehicles?: Vehicle[];
}