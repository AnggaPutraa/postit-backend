import { Body, Controller } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { GetCurrentUser, GetCurrentUserById } from 'src/common/decorators/_index';

@Controller('auth')
export class AuthController {
    async localSignUp(@Body() data: AuthDto) {}
    async localSignIn(@Body() data: AuthDto) {}
    async logout(@GetCurrentUserById() userId: string) {}
    async refresh(
        @GetCurrentUserById() userId: string,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ) {}
}
