import { ApiProperty } from '@nestjs/swagger';

export class CreateTimesheetEntryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  minutes: number;

  @ApiProperty()
  details: string;

  @ApiProperty()
  billable: boolean;

  @ApiProperty()
  teamId: number;

  @ApiProperty()
  userId: number;
}
