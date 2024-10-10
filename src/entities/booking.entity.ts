import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';
import { Team } from './team.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.bookings)
  users: User[];

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  tentative: boolean;

  @Column()
  projectId: number;

  @ManyToOne(() => Project, (project) => project.bookings)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  Billable: boolean;

  @Column()
  details: string;

  @Column()
  bookerId: number;

  // @ManyToOne(() => User, (user) => user.bookerOf)
  @ManyToOne(() => User)
  @JoinColumn()
  booker: User;

  @Column()
  teamId: number;

  @ManyToOne(() => Team, (team) => team.bookings)
  @JoinColumn()
  team: Team;
}
