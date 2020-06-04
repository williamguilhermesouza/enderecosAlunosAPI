import { Resolver, Query, Mutation, Args, Int, InputType, Field, ID } from '@nestjs/graphql';
import { alunoService } from '../alunos/aluno.service';
import { AlunoGraphqlModel } from './models/aluno.model';

@InputType()
class AlunoInput {
    @Field(type => ID)
    id: number;

    @Field()
    nome: string;

    @Field()
    data_nascimento: Date;

    @Field()
    cpf: string;

    @Field(type => Int)
    nota: number;

}

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
    async AlunoCriterio(@Args('nota', {type: () => Int}) nota: number, @Args('criterio')  criterio: string): Promise<AlunoGraphqlModel[]> {
    	return this.alunoService.getAlunoCriterio(nota, criterio);
    }
	
    @Mutation(returns => AlunoGraphqlModel)
    async updateAluno(@Args('id', { type: () => Int }) id: number, @Args('aluno') aluno: AlunoInput): Promise<{}> {
	return this.alunoService.update(id, aluno);
    }
}
