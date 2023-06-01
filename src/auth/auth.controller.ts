import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { GetCurrentUser, GetCurrentUserById, Public } from 'src/common/decorators/_index';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from 'src/common/guards/refresh_token.guard';

@Controller('auth')
export class AuthController {
    constructor(private authServices: AuthService) { }

    @Public()
    @Post('/local/signup')
    @HttpCode(HttpStatus.CREATED)
    async localSignUp(@Body() data: AuthDto) { 
        return this.authServices.localSignUp(data);
    }

    @Public()
    @Post('/local/signin')
    @HttpCode(HttpStatus.OK)
    async localSignIn(@Body() data: AuthDto) {
        return this.authServices.localSignIn(data);
     }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUserById() userId: string) {
        return this.authServices.logout(userId);
     }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(
        @GetCurrentUserById() userId: string,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ) { 
        return this.authServices.refresh(userId, refreshToken);
    }

}
