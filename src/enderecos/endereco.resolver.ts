import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { enderecoService } from './endereco.service';
import { EnderecoGraphqlModel, AlunoEndereco } from './models/endereco.model';
import { EnderecoInput } from './models/endereco.input';

@Resolver(of => EnderecoGraphqlModel)
export class enderecoResolver {
    constructor(
        private readonly enderecoService: enderecoService,
    ) {}

    @Query(returns => [EnderecoGraphqlModel])
    async Enderecos(@Args('bairro', { nullable: true }) bairro?: string): Promise<EnderecoGraphqlModel[]> {
        return this.enderecoService.findAll(bairro);
    }

    @Query(returns => AlunoEndereco)
    async AlunoResidencia(@Args('id', { type: () => Int }) id: number): Promise<{}> {
        return this.enderecoService.queryAlunoEndereco(id);
    }


}
