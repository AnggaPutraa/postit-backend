import { IsBase64, IsNotEmpty } from "class-validator";

export class PostDto {
    @IsNotEmpty()
    body: string;

    @IsBase64()
    image: string;
}