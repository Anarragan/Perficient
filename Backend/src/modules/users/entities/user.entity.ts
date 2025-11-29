import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  phone?: string | null;

  @Column('text', { nullable: true })
  cc?: string | null;

  @Column('text', { nullable: true, name: 'url_photo' })
  url_photo?: string | null;
}
