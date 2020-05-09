import { Resolver, Query } from '@nestjs/graphql';
import { alunoService } from '../alunos/aluno.service';

@Resolver('Aluno')
export class AlunoResolver {
    constructor(
        private alunoService: alunoService,
    ) {}

    @Query()
    async getAluno() {
        return this.alunoService.findAll();
    }
}