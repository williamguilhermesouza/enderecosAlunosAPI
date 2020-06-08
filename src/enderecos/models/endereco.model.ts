import { ID, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EnderecoGraphqlModel {
    @Field(type => ID)
    id: number;

    @Field()
    rua: string;

    @Field()
    numero?: string;

    @Field()
    complemento?: string;

    @Field()
    bairro: string;

    @Field(type => Int)
    aluno_id: number;
}
