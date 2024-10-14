import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Booking } from './booking.entity';
import { TimesheetEntry } from './timesheet-entry.entity';
import { Team } from './team.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ default: null })
  @ApiProperty()
  passwordHash: string;

  @Column({ default: null })
  @ApiProperty()
  refreshTokenHash: string;

  @ManyToMany(() => Team, (team) => team.users)
  @JoinTable({ name: 'membership' })
  teams: Team[];

  @ManyToMany(() => Booking, (booking) => booking.users)
  @JoinTable({ name: 'user_booking' })
  bookings: Booking[];

  @OneToMany(() => TimesheetEntry, (timesheetEntry) => timesheetEntry.user)
  @ApiProperty()
  timesheetEntries: TimesheetEntry[];

  // @OneToMany(() => Booking, (booking) => booking.booker)
  // @ApiProperty()
  // bookerOf: Booking[];

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
