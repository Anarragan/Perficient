import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'maps' })
export class Map {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  url: string;

  @Column('text', { nullable: true })
  description?: string | null;
}
