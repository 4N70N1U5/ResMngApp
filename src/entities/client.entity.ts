import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Team } from './team.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  details: string;

  @OneToMany(() => Project, (project) => project.client)
  projects: Project[];

  @Column()
  teamId: number;

  @ManyToOne(() => Team, (team) => team.clients)
  @JoinColumn()
  team: Team;
}
