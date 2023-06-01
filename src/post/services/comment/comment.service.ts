import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { CommentDto } from 'src/post/dto/comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) { }

    async createComment(userId: string, data: CommentDto) {
        await this.prisma.comment.create({
            data: {
                userId,
                postId: data.postId,
                body: data.body
            }
        });
    }
}
