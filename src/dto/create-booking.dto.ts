import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty()
  userIds: number[];

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  tentative: boolean;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  Billable: boolean;

  @ApiProperty()
  details: string;

  @ApiProperty()
  bookerId: number;
}
