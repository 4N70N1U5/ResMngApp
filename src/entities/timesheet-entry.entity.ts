import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Team } from './team.entity';
import { User } from './user.entity';

@Entity()
export class TimesheetEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @ManyToOne(() => Project)
  project: Project;

  @Column()
  date: Date;

  @Column()
  minutes: number;

  @Column()
  details: string;

  @Column()
  billable: boolean;

  @Column()
  teamId: number;

  @ManyToOne(() => Team)
  @JoinColumn()
  team: Team;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.timesheetEntries)
  @JoinColumn()
  user: User;
}
