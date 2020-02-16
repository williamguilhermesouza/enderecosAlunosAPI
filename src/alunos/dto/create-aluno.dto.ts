// creating the dto to receive the aluno from body requests

export class CreateAlunoDto {
    readonly id: number;
    readonly nome: string;
    readonly data_nascimento: Date;
    readonly cpf: string;
    readonly nota: number;
}