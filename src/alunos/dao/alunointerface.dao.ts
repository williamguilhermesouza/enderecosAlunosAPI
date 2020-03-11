// data access object to return alunos, interface to the dao

// to output with dots
// SELECT CONCAT(SUBSTR(cpf,1,3),
//  '.', SUBSTR(cpf, 3,3), '.', SUBSTR(cpf, 6,3)) FROM aluno WHERE nome='william';

// to input without dots
// SELECT REPLACE(nome, 'i', 'y') FROM aluno WHERE nome LIKE 'william';

import { Aluno } from '../aluno.entity';

// interface that lists the methods of the DAO, for access 
// from the service 
export interface alunoDaoInterface {
    create(aluno: Aluno): Promise<Aluno>;
    update(aluno: Aluno): Promise<Aluno>;
    findOne(id: number): Promise<Aluno>;
    delete(id: number): Promise<Aluno>;
    findAll(): Promise<Aluno[]>;
    //getAlunoCriterio(aluno: any): Promise<Aluno[]>;
    //approved(aluno: any): Promise<Aluno[]>;
}