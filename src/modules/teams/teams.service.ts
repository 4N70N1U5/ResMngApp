import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeamDto } from '../../dto/create-team.dto';
import { UpdateTeamDto } from '../../dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/entities/team.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
// import { Membership } from 'src/entities/membership.entity';
import { UserRoles } from 'src/enums/user-roles.enum';
import { MembershipsService } from 'src/modules/memberships/memberships.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
    private readonly membershipsService: MembershipsService,
    // @InjectRepository(Membership)
    // private readonly membershipRepository: Repository<Membership>,
  ) {}

  async create(createTeamDto: CreateTeamDto, user: User) {
    if (await this.teamsRepository.findOneBy({ ownerId: user.id })) {
      throw new BadRequestException('User already owns a team');
    }

    const team = this.teamsRepository.create({
      ...createTeamDto,
      ownerId: user.id,
    });

    team.users = [{ ...new User(), id: user.id }];

    const savedTeam = await this.teamsRepository.save(team);

    this.membershipsService.create(user.id, savedTeam.id, UserRoles.ADMIN);

    return savedTeam;
  }

  findAll() {
    return this.teamsRepository.find({ relations: { owner: true } });
  }

  // findOne(id: number) {
  //   return this.teamsRepository.findOneBy({ id: id });
  // }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.teamsRepository.update(id, updateTeamDto);
  }

  remove(id: number) {
    return this.teamsRepository.delete({ id: id });
  }
}
