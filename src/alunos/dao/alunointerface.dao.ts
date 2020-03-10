// data access object to return alunos, interface to the dao

// to output with dots
// SELECT CONCAT(SUBSTR(cpf,1,3),
//  '.', SUBSTR(cpf, 3,3), '.', SUBSTR(cpf, 6,3)) FROM aluno WHERE nome='william';

// to input without dots
// SELECT REPLACE(nome, 'i', 'y') FROM aluno WHERE nome LIKE 'william';

import { alunoImplementation } from './alunoimplementation.dao';
import { alunoModel } from './alunomodel.dao';

export interface alunoInterface {
    // function to create a new aluno
    
}