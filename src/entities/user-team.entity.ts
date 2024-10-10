import { UserRoles } from 'src/enums/user-roles.enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_team' })
export class UserTeam {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  teamId: number;

  @Column()
  role: UserRoles;
}
