import { IsOptional, IsUUID } from "class-validator";
import { IsDate } from "class-validator/types/decorator/decorators";

export abstract class BaseDTO {

    @IsUUID()
    @IsOptional()
    id!: string;

    @IsDate()
    @IsOptional()
    createdAt!: string;

    @IsDate()
    @IsOptional()
    updatedAt!: string;
}