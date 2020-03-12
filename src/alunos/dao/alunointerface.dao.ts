// data access object to return alunos, interface to the dao

import { Aluno } from '../aluno.entity';

export interface alunoDaoInterface {
    create(aluno: Aluno): Promise<Aluno>;
    update(id: number, aluno: Aluno): Promise<{}>;
    findOne(id: number): Promise<Aluno>;
    delete(id: number): Promise<{}>;
    findAll(): Promise<Aluno[]>;
    getAlunoCriterio(nota: number, criterio: string): Promise<Aluno[]>;
    approved(): Promise<Aluno[]>;
}