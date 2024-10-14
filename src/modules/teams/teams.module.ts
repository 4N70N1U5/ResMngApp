import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/entities/team.entity';
import { ClientsModule } from '../clients/clients.module';
// import { Membership } from 'src/entities/membership.entity';
import { MembershipsModule } from 'src/modules/memberships/memberships.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), MembershipsModule, ClientsModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
