import { IsDate, IsOptional, IsUUID } from "class-validator";

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