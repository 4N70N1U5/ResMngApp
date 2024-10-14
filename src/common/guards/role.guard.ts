import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from 'src/enums/user-roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { MembershipsService } from 'src/modules/memberships/memberships.service';

export class RoleGuard implements CanActivate {
  constructor(
    @Inject(MembershipsService)
    private readonly membershipsService: MembershipsService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const { user, params } = context.switchToHttp().getRequest();

    const userRoleInTeam = await this.membershipsService.findRole(
      user.id,
      params.teamId,
    );

    console.log(user, params, userRoleInTeam);

    if (!userRoleInTeam) return false;

    return requiredRoles.includes(userRoleInTeam.role);
  }
}
