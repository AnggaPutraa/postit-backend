import { IsNotEmpty } from "class-validator";

export class CommentDto {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    postId: string;
    
    @IsNotEmpty()
    body: string;
}