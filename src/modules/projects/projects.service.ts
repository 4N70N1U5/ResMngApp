import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../../dto/create-project.dto';
import { UpdateProjectDto } from '../../dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../../entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.projectsRepository.save(createProjectDto);
  }

  findAll() {
    return this.projectsRepository.find({ relations: { client: true } });
  }

  findOne(id: number) {
    return this.projectsRepository.findOneBy({ id: id });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectsRepository.update(id, updateProjectDto);
  }

  remove(id: number) {
    return this.projectsRepository.delete({ id: id });
  }
}
