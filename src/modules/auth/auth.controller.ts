import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('set-password/:id') // TODO: replace id with token generated when inviting user containing id of user to set password for
  @ApiBody({ schema: { example: { password: 'string' } } })
  setPassword(
    @Param('id') id: number,
    @Body() setPasswordDto: { password: string },
  ) {
    return this.authService.setPassword(id, setPasswordDto.password);
  }

  @Post('refresh')
  @ApiBody({ schema: { example: { refreshToken: 'string' } } })
  refresh(@Body() refreshTokenDto: { refreshToken: string }) {
    return this.authService.refresh(refreshTokenDto.refreshToken);
  }
}
