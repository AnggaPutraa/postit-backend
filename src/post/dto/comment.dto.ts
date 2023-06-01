import { IsNotEmpty, IsString } from "class-validator";

export class CommentDto {
    @IsNotEmpty()
    @IsString()
    postId: string;
    
    @IsNotEmpty()
    @IsString()
    body: string;
}