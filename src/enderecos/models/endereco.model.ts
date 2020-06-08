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
