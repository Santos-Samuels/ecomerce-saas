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

  const durationMatch = /^(\d+)([smhd])$/i.exec(envValue.trim());

  if (!durationMatch) {
    return 3600;
  }

  const [, amountStr, unit] = durationMatch;
  const amount = Number(amountStr);

  if (Number.isNaN(amount)) {
    return 3600;
  }

  const lowerUnit = unit.toLowerCase();

  const unitMultipliers: Record<string, number> = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
  };

  const multiplier = unitMultipliers[lowerUnit];

  if (!multiplier) {
    return 3600;
  }

  return amount * multiplier;
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
