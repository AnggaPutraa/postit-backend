import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { GetCurrentUserById } from 'src/common/decorators/getCurrentUserById.decorator';
import { CommentDto } from 'src/post/dto/_index';
import { CommentService } from 'src/post/services/comment/comment.service';

@Controller('post/comment')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createComment(
        @GetCurrentUserById() userId: string,
        @Body() data: CommentDto,
    ) {
        this.commentService.createComment(userId, data);
    }
}
