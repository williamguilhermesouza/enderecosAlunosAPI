import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EnderecoInput {
    @Field()
    id: number;

    @Field()
    rua: string;

    @Field()
    numero?: string;

    @Field()
    complemento?: string;

    @Field()
    bairro: string;

    @Field()
    aluno_id: number;
}
