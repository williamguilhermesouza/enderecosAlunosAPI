// data access object to return alunos, interface to the dao

// to output with dots
// SELECT CONCAT(SUBSTR(cpf,1,3),
//  '.', SUBSTR(cpf, 3,3), '.', SUBSTR(cpf, 6,3)) FROM aluno WHERE nome='william';

// to input without dots
// SELECT REPLACE(nome, 'i', 'y') FROM aluno WHERE nome LIKE 'william';

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