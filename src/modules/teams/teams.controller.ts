import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from '../../dto/create-team.dto';
import { UpdateTeamDto } from '../../dto/update-team.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoles } from 'src/enums/user-roles.enum';
import { ClientsService } from '../clients/clients.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/entities/user.entity';
import { CreateClientDto } from 'src/dto/create-client.dto';

@Controller('teams')
@ApiTags('Teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly clientsService: ClientsService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTeamDto: CreateTeamDto, @CurrentUser() user: User) {
    return this.teamsService.create(createTeamDto, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoles.ADMIN, UserRoles.MANAGER)
  @Post(':teamId/clients')
  createClient(
    @Param('teamId') teamId: string,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.clientsService.create(createClientDto, +teamId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.BASIC)
  @Get(':teamId/clients')
  findAllClients(@Param('teamId') teamId: string) {
    return this.clientsService.findAllByTeamId(+teamId);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  // @Roles(UserRoles.ADMIN, UserRoles.MANAGER)
  // @UseGuards(AuthGuard, RoleGuard)
  // @Get(':teamId')
  // findOne(@Param('teamId') id: string) {
  //   return this.teamsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}
