import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './client.entity';
import { Booking } from './booking.entity';
import { Team } from './team.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  clientId: number;

  @ManyToOne(() => Client, (client) => client.projects)
  @JoinColumn()
  client: Client;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  billable: boolean;

  @Column()
  details: string;

  @OneToMany(() => Booking, (booking) => booking.project)
  bookings: Booking[];

  @Column()
  teamId: number;

  @ManyToOne(() => Team, (team) => team.projects)
  @JoinColumn()
  team: Team;
}
