// implementation of the dao functions specified at the interface
import { Aluno } from '../aluno.entity';
import { alunoDaoModel } from './alunomodel.dao';
import { alunoDaoInterface } from './alunointerface.dao';


export class alunoDao implements alunoDaoInterface {
    constructor(readonly alunoDaoModel: alunoDaoModel) {}


    async find(): Promise<Aluno[]> {
        let alunos = await this.alunoDaoModel.getAll();
        return alunos;
    }
}