import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/_index';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) { }

    async getPosts(): Promise<Post[]> {
        const posts = await this.prisma.post.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return posts;
    }

    async getPost(postId: string): Promise<Post> {
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId
            }
        });
        return post;
    }

    async createPost(userId: string, data: PostDto) {
        await this.prisma.post.create({
            data: {
                userId,
                body: data.body,
                image: data.image
            }
        });
    }

    async getComments() { }

    async createComment() { }

    async addLikeToPost() { }

    async removeLikeFromPost() { }

}
