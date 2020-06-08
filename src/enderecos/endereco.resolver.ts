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
        const enderecos = await this.enderecoService.queryAlunoEndereco(id);
        return enderecos;
        
    }

    @Mutation(returns => EnderecoGraphqlModel)
    async createEndereco(@Args('endereco') endereco: EnderecoInput): Promise<EnderecoGraphqlModel> {
        const enderecoObject = {
            id: endereco.id,
            rua: endereco.rua,
            numero: endereco.numero,
            complemento: endereco.complemento,
            bairro: endereco.bairro,
            aluno_id: endereco.aluno_id,
        };

        return this.enderecoService.create(enderecoObject);
    }

}
