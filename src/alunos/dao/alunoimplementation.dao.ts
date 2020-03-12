import { Aluno } from '../aluno.entity';
import { alunoDaoModel } from './alunomodel.dao';
import { alunoDaoInterface } from './alunointerface.dao';

// implementation of the dao functions specified at the interface
// the Dao is an extension from the operations defined at the model
// and uses those operations to interact with the DB, although they're
// in separate files, they are only used as alunoDao methods. 
export class alunoDao extends alunoDaoModel implements alunoDaoInterface {

    // function to create a new aluno
    async create(aluno: Aluno): Promise<Aluno> {
        return await this.__save(aluno); 
        
    }

    // function to update an aluno and return a message
    async update(id: number, aluno: Aluno): Promise<{}> {
        return await this.__update(id, aluno);
        
    }

    // returns the aluno with the given id
    async findOne(id: number): Promise<Aluno> {
        return await this.__findOne(id);
    }

    // delete the aluno with the given id and returns a message
    async delete(id: number): Promise<{}> {
        return await this.__delete(id);
    }

    // function that returns an array of all alunos
    async findAll(): Promise<Aluno[]> {
        let alunos = await this.__find();
        return alunos;       
    }



    // function that returns an aluno with nota matching criterio (lt for < 
    // and bt for >)
    async getAlunoCriterio(nota: number, criterio: string): Promise<Aluno[]> {
        let alunos = await this.__getAlunoCriterio(nota, criterio);
        return alunos;
    }

    // returns an array of aluno that has nota bigger than the average
    // of all aluno nota
    async approved(): Promise<Aluno[]> {
        let alunos = await this.__approved();
        return alunos;

    }
}
