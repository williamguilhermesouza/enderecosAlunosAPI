// creating the dto to receive the aluno from body requests
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNumber } from 'class-validator';

export class CreateAlunoDto {
    @IsInt()
    readonly id: number;
    @IsString()
    readonly nome: string;
    @IsString()
    readonly data_nascimento: Date;
    @IsString()
    readonly cpf: string;
    @IsNumber()
    readonly nota: number;
}