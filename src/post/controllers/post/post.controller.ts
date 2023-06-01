import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PostService } from '../../services/post/post.service';
import { GetCurrentUserById } from 'src/common/decorators/getCurrentUserById.decorator';
import { PostDto } from '../../dto/_index';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }


    @Get()
    @HttpCode(HttpStatus.OK)
    getPosts() {
        return this.postService.getPosts();
    }

    @Get('/:postId')
    getPost(@Param('postId') postId: string) {
        return this.postService.getPost(postId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createPost(@GetCurrentUserById() userId: string, @Body() data: PostDto) {
        return this.postService.createPost(userId, data);
    }
    
}
