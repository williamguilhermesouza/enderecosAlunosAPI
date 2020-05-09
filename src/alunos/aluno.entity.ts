import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';  // graphql models


// typeorm entity defining the table in DataBase

@ObjectType()
@Entity()
export class Aluno {

    @Field(type => Int)
    @PrimaryColumn()
    id: number;

    @Field()
    @Column()
    nome: string;

    @Field()
    @Column()
    data_nascimento: Date;

    @Field()
    @Column()
    cpf: string;

    @Field(type => Int)
    @Column()
    nota: number;
}