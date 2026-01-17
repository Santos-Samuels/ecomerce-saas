import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthController } from './auth.controller';

function getJwtExpiresIn(): number {
  const envValue = process.env.JWT_EXPIRES_IN;

  if (!envValue) {
    return 3600;
  }

  const numericValue = Number(envValue);

  if (!Number.isNaN(numericValue)) {
    return numericValue;
  }

  return 3600;
}

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'dev-secret',
      signOptions: {
        expiresIn: getJwtExpiresIn(),
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard, JwtModule],
})
export class AuthModule {}
