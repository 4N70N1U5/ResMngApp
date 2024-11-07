import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from '../../entities/membership.entity';
import { UserRoles } from '../../enums/user-roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
  ) {}

  create(userId: number, teamId: number, role: UserRoles) {
    return this.membershipRepository.save({
      userId,
      teamId,
      role,
    });
  }

  find(userId: number, teamId: number) {
    return this.membershipRepository.findOneBy({ userId, teamId });
  }
}
