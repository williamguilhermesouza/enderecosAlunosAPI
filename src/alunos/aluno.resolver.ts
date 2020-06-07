import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { alunoService } from '../alunos/aluno.service';
import { AlunoGraphqlModel } from './models/aluno.model';
import { AlunoInput } from './models/aluno.input';

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

    @Query(returns => [AlunoGraphqlModel])
    async approved(): Promise<AlunoGraphqlModel[]> {
	return this.alunoService.approved();
    }

    @Mutation(returns => AlunoGraphqlModel)
    async createAluno(@Args('aluno') aluno: AlunoInput): Promise<AlunoGraphqlModel> {
	const alunoObject = {
	    id: aluno.id,
	    nome: aluno.nome,
	    data_nascimento: aluno.data_nascimento,
	    cpf: aluno.cpf,
	    nota: aluno.nota,
	};

	return this.alunoService.create(alunoObject);
    }
	
    @Mutation(returns => AlunoGraphqlModel)
    async updateAluno(@Args('id', { type: () => Int }) id: number, @Args('aluno') aluno: AlunoInput): Promise<{}> {

	const alunoObject = { 
	    id: aluno.id,
	    nome: aluno.nome,
	    data_nascimento: aluno.data_nascimento,
	    cpf: aluno.cpf,
	    nota: aluno.nota,
	};

	this.alunoService.update(id, alunoObject);

	return this.alunoService.findOne(id);
    }

    @Mutation(returns => AlunoGraphqlModel) 
    async deleteAluno(@Args('id', { type: () => Int }) id: number): Promise<AlunoGraphqlModel> {
	const deleted = this.alunoService.findOne(id);
	this.alunoService.delete(id);
	return deleted;
    }
}
