import { UserRoles } from 'src/enums/user-roles.enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'membership' })
export class Membership {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  teamId: number;

  @Column({ type: 'enum', enum: UserRoles })
  role: UserRoles;
}
