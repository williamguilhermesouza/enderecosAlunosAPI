import { Entity, PrimaryColumn, Column } from 'typeorm';

// typeorm entity defining the table in DataBase
@Entity()
export class Endereco {

    @PrimaryColumn()
    id: number;

    @Column()
    rua: string;

    @Column()
    numero?: string;

    @Column()
    complemento?: string;

    @Column()
    bairro: string;

    @Column()
    aluno_id: number;
}