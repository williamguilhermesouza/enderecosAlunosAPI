import { Entity, PrimaryColumn, Column } from 'typeorm';


// typeorm entity defining the table in DataBase
@Entity()
export class Aluno {

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
