// creating the dto to receive the endereco from body requests
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnderecoDto {
    readonly id: number;
    readonly rua: string;
    readonly numero: string;
    readonly complemento: string;
    readonly bairro: string;
    readonly aluno_id: number;
}