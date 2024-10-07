import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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

  @Column()
  @ApiProperty()
  passwordHash: string;

  @Column()
  @ApiProperty()
  salt: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
