import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { alunoService } from '../alunos/aluno.service';
import { AlunoGraphqlModel } from './models/aluno.model';


@Resolver(of => AlunoGraphqlModel)
export class alunoResolver {
    constructor(
        private alunoService: alunoService,
    ) {}

    @Query(returns => [AlunoGraphqlModel])
    async Alunos(): Promise<AlunoGraphqlModel[]> {
        return this.alunoService.findAll();
    }

    @Query(returns => AlunoGraphqlModel)
    async Aluno(@Args('id', { type: () => Int }) id: number): Promise<AlunoGraphqlModel> {
    	return this.alunoService.findOne(id);
    }
    @Query(returns => [AlunoGraphqlModel])
    async AlunoCriterio(@Args('nota', {type: () => Int}) nota: number, @Args('criterio', {type: () => string})  criterio: string): Promise<AlunoGraphqlModel[]> {
    	return this.alunoService.getAlunoCriterio(nota, criterio);
    }
}
