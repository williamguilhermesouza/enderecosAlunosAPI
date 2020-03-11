import { Aluno } from './aluno.entity';
import { alunoDAO } from './dao/alunoimplementation.dao';

// the code will be improved with the data access object,
// this way, the service (business logic layer) won't need
// to know details about the database (as importing the entity)
// all this work will be done at the dao database layer

// creating an injectable service with the functions
export class alunoService {

    //using constructor to inject aluno entity into the service
    constructor(
        private readonly alunoDAO: alunoDAO,
    ) {}

    // function to create a new aluno
    async create(aluno: Aluno): Promise<Aluno> {
        return this.alunoDAO.create(aluno);
        
    }

    // if aluno exist, update it, if not create it
    async update(id: number, aluno: Aluno): Promise<Aluno> {
        return this.alunoDAO.create(aluno);

    }

    // returns the aluno with the given id
    findOne(id: number): Promise<Aluno> {
        return this.alunoDAO.findOne(id);
    }

    // delete the aluno with the given id and returns it
    async delete(id: number): Promise<Aluno> {
        return this.alunoDAO.delete(id);
    }

    // function that returns an array of all alunos
    async findAll(): Promise<Aluno[]> {
        return this.alunoDAO.findAll();
    }

    // function that returns an aluno with nota matching criterio (lt for < 
    // and bt for >)
    async getAlunoCriterio(nota: number, criterio: string): Promise<Aluno[]> {
        return this.alunoDAO.findAll();
    }

    // returns an array of aluno that has nota bigger than the average
    // of all aluno nota
    async approved(): Promise<Aluno[]> {
        return this.alunoDAO.findAll();

    }
}