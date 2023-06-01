import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { Tokens } from './types/_index';
import * as bycrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService) { }

    async localSignUp(data: AuthDto): Promise<Tokens> {
        const hashedPassword = await this.hashData(data.password);
        const newUser = await this.prisma.user.create({
            data: {
                email: data.email,
                hashedPassword
            }
        });

        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateHashedRefreshToken(newUser.id, tokens.refresh_token);
        return tokens;
    }

    async localSignIn(data: AuthDto): Promise<Tokens> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (!user) throw new ForbiddenException('Access Denied');
        const isPasswordMatch = await bycrypt.compare(data.password, user.hashedPassword);
        if (!isPasswordMatch) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user.id, user.email);
        await this.updateHashedRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }

    async logout(userId: string) {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRefreshToken: {
                    not: null,
                },
            },
            data: {
                hashedRefreshToken: null,
            },
        });
    }

    async refresh(
        userId: string,
        refreshToken: string,
    ) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user || !refreshToken) throw new ForbiddenException('Access Denied');
        const isRefreshTokenMatch = await bycrypt.compare(refreshToken, user.hashedRefreshToken);

        if (!isRefreshTokenMatch) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.email);

        await this.updateHashedRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }

    private hashData(data: string) {
        return bycrypt.hash(data, 10);
    }

    private async getTokens(userId: string, email: string) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    expiresIn: 60 * 15,
                    secret: process.env.ACCESS_TOKEN_SECRET,
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    expiresIn: 60 * 60 * 24 * 7,
                    secret: process.env.REFRESH_TOKEN_SECRET,
                },
            ),
        ]);

        return {
            access_token,
            refresh_token,
        };
    }

    private async updateHashedRefreshToken(
        userId: string,
        refreshToken: string
    ) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRefreshToken
            },
        });
    }

}
