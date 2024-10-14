import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
// import { User } from './entities/user.entity';
import { ClientsModule } from './modules/clients/clients.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { TeamsModule } from './modules/teams/teams.module';
import { TimesheetEntriesModule } from './modules/timesheet-entries/timesheet-entries.module';
// import { MembershipsService } from './modules/memberships/memberships.service';
import { MembershipsModule } from './modules/memberships/memberships.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'express',
      password: 'express',
      database: 'resmngapp',
      // entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ClientsModule,
    ProjectsModule,
    BookingsModule,
    TeamsModule,
    TimesheetEntriesModule,
    MembershipsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
