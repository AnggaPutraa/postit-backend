import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
