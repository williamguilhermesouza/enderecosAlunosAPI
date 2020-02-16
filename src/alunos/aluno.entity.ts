import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class aluno {

    @PrimaryColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    data_nascimento: Date;

    @Column()
    cpf: string;

    @Column()
    nota: number;
}