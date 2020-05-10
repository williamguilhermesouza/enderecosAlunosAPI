import { ID, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AlunoGraphqlModel {
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