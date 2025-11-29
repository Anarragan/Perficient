import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { VehicleType } from '../../vehicle_type/entities/vehicle_type.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  capacidad: number;

  @ManyToOne(() => VehicleType, (type) => type.vehicles, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_type' })
  id_type: VehicleType;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'id_user' })
  id_user?: User | null;
}
