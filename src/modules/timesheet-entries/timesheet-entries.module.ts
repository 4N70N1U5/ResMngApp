import { Module } from '@nestjs/common';
import { TimesheetEntriesService } from './timesheet-entries.service';
import { TimesheetEntriesController } from './timesheet-entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimesheetEntry } from 'src/entities/timesheet-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimesheetEntry])],
  controllers: [TimesheetEntriesController],
  providers: [TimesheetEntriesService],
})
export class TimesheetEntriesModule {}
