import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  billable: boolean;

  @ApiProperty()
  details: string;
}
