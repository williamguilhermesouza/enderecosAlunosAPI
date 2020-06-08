import { ID, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EnderecoGraphqlModel {
    @Field(type => ID)
    id: number;

    @Field()
    rua: string;

    @Field({ nullable: true })
    numero?: string;

    @Field({ nullable: true })
    complemento?: string;

    @Field()
    bairro: string;

    @Field(type => Int)
    aluno_id: number;
}

@ObjectType()
class EnderecoBairro {
    @Field()
    endereco: string;
    
    @Field()
    bairro: string;
}

@ObjectType()
export class AlunoEndereco {
    @Field(type => EnderecoBairro)
    enderecos: EnderecoBairro;

    @Field(type => Int)
    total: number;
}
