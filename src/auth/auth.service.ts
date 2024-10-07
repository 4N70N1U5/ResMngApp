import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneByEmail(email);

    if (user === null) {
      throw new UnauthorizedException();
    }

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.jwtService.sign({ id: user.id }),
    };
  }

  async register(registerDto: RegisterDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.create(registerDto);

    return {
      accessToken: this.jwtService.sign({ id: user.id }),
    };
  }
}
