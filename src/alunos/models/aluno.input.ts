import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AlunoInput {
    @Field()
    id: number;

    @Field()
    nome: string;

    @Field()
    data_nascimento: Date;

    @Field()
    nota: number;

    @Field()
    cpf: string;

}


