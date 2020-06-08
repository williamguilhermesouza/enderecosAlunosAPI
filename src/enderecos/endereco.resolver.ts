import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { enderecoService } from './endereco.service';
import { EnderecoGraphqlModel } from './models/endereco.model';
import { EnderecoInput } from './models/endereco.input';

@Resolver(of => EnderecoGraphqlModel)
export class enderecoResolver {
    constructor(
        private readonly enderecoService: enderecoService,
    ) {}


}
