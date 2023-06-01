import { Module } from '@nestjs/common';
import { PostController } from './controllers/post/post.controller';
import { PostService } from './services/post/post.service';
import { CommentController } from './controllers/comment/comment.controller';
import { CommentService } from './services/comment/comment.service';

@Module({
  controllers: [PostController, CommentController],
  providers: [PostService, CommentService],
})
export class PostModule {}
