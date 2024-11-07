import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOneByEmail(email);

    if (user === null) {
      throw new UnauthorizedException('Wrong email or password');
    }

    if (
      user.passwordHash === null ||
      !(await bcrypt.compare(password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
        // firstName: user.firstName,
        // lastName: user.lastName,
        email: user.email,
      },
      { expiresIn: '7d' },
    );

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    this.usersService.update(user.id, { refreshTokenHash });

    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          // firstName: user.firstName,
          // lastName: user.lastName,
          email: user.email,
        },
        { expiresIn: '15m' },
      ),
      refreshToken,
    };
  }

  async register(
    registerDto: RegisterDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const user = await this.usersService.create({
      ...registerDto,
      passwordHash,
    });

    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
        // firstName: user.firstName,
        // lastName: user.lastName,
        email: user.email,
      },
      { expiresIn: '7d' },
    );

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    this.usersService.update(user.id, { refreshTokenHash });

    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          // firstName: user.firstName,
          // lastName: user.lastName,
          email: user.email,
        },
        { expiresIn: '15m' },
      ),
      refreshToken,
    };
  }

  async setPassword(
    id: number,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOneById(id);

    if (user === null) {
      throw new UnauthorizedException('Invalid user');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
        // firstName: user.firstName,
        // lastName: user.lastName,
        email: user.email,
      },
      { expiresIn: '7d' },
    );

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    this.usersService.update(user.id, { passwordHash, refreshTokenHash });

    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          // firstName: user.firstName,
          // lastName: user.lastName,
          email: user.email,
        },
        { expiresIn: '15m' },
      ),
      refreshToken,
    };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);

      const user = await this.usersService.findOneById(payload.id);

      if (
        user === null ||
        user.refreshTokenHash === null ||
        !(await bcrypt.compare(refreshToken, user.refreshTokenHash))
      ) {
        this.usersService.update(user.id, { refreshTokenHash: null });
        throw new UnauthorizedException('Invalid refresh token');
      }

      return {
        accessToken: this.jwtService.sign(
          {
            id: user.id,
            // firstName: user.firstName,
            // lastName: user.lastName,
            email: user.email,
          },
          { expiresIn: '15m' },
        ),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
