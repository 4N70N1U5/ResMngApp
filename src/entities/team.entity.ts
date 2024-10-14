import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Booking } from './booking.entity';
import { Client } from './client.entity';
import { Project } from './project.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  ownerId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @ManyToMany(() => User, (user) => user.teams)
  users: User[];

  @OneToMany(() => Booking, (booking) => booking.team)
  bookings: Booking[];

  @OneToMany(() => Client, (client) => client.team)
  clients: Client[];

  @OneToMany(() => Project, (project) => project.team)
  projects: Project[];
}
