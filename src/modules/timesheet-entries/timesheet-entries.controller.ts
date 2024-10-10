import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimesheetEntriesService } from './timesheet-entries.service';
import { CreateTimesheetEntryDto } from '../../dto/create-timesheet-entry.dto';
import { UpdateTimesheetEntryDto } from '../../dto/update-timesheet-entry.dto';

@Controller('timesheet-entries')
export class TimesheetEntriesController {
  constructor(
    private readonly timesheetEntriesService: TimesheetEntriesService,
  ) {}

  @Post()
  create(@Body() createTimesheetEntryDto: CreateTimesheetEntryDto) {
    return this.timesheetEntriesService.create(createTimesheetEntryDto);
  }

  @Get()
  findAll() {
    return this.timesheetEntriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timesheetEntriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimesheetEntryDto: UpdateTimesheetEntryDto,
  ) {
    return this.timesheetEntriesService.update(+id, updateTimesheetEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timesheetEntriesService.remove(+id);
  }
}
