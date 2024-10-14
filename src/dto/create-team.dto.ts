import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty()
  name?: string;

  // @ApiProperty()
  // ownerId: number;

  // @ApiProperty()
  // userIds: number[];
}
