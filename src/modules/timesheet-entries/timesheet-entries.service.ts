import { Injectable } from '@nestjs/common';
import { CreateTimesheetEntryDto } from '../../dto/create-timesheet-entry.dto';
import { UpdateTimesheetEntryDto } from '../../dto/update-timesheet-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TimesheetEntry } from 'src/entities/timesheet-entry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimesheetEntriesService {
  constructor(
    @InjectRepository(TimesheetEntry)
    private readonly timesheetEntryRepository: Repository<TimesheetEntry>,
  ) {}

  create(createTimesheetEntryDto: CreateTimesheetEntryDto) {
    return this.timesheetEntryRepository.save(createTimesheetEntryDto);
  }

  findAll() {
    return this.timesheetEntryRepository.find();
  }

  findOne(id: number) {
    return this.timesheetEntryRepository.findOneBy({ id: id });
  }

  update(id: number, updateTimesheetEntryDto: UpdateTimesheetEntryDto) {
    return this.timesheetEntryRepository.update(id, updateTimesheetEntryDto);
  }

  remove(id: number) {
    return this.timesheetEntryRepository.delete({ id: id });
  }
}
