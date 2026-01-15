import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { AuthTokenPayload } from './auth.types';
import { IUser } from '@ecomerce/shared';

interface AuthenticatedRequest extends Request {
  user?: AuthTokenPayload;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: LoginDto,
  ): Promise<{ accessToken: string; user: IUser }> {
    return this.authService.login(data);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: AuthenticatedRequest): Promise<IUser | null> {
    if (!req.user) {
      return null;
    }
    return this.authService.getProfile(req.user.sub);
  }
}
