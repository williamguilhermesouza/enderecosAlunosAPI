// creating the dto to receive the endereco from body requests
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateEnderecoDto {
    @IsInt()
    readonly id: number;
    @IsString()
    readonly rua: string;
    @IsOptional()
    @IsInt()
    readonly numero?: string;
    @IsOptional()
    @IsString()
    readonly complemento?: string;
    @IsString()
    readonly bairro: string;
    @IsInt()
    readonly aluno_id: number;
}