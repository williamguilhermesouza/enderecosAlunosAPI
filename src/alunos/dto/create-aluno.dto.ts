// creating the dto to receive the aluno from body requests
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlunoDto {
    readonly id: number;
    readonly nome: string;
    readonly data_nascimento: Date;
    readonly cpf: string;
    readonly nota: number;
}