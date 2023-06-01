import { Module } from '@nestjs/common';
import { PostController } from './controllers/post/post.controller';
import { PostService } from './services/post/post.service';
import { CommentController } from './controllers/comment/comment.controller';
import { LikeController } from './controllers/like/like.controller';
import { CommentService } from './services/comment/comment.service';
import { LikeService } from './services/like/like.service';

@Module({
  controllers: [PostController, CommentController, LikeController],
  providers: [PostService, CommentService, LikeService]
})
export class PostModule {}
