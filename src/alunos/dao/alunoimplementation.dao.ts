// implementation of the dao functions specified at the interface
import { Aluno } from '../aluno.entity';
import { alunoDaoModel } from './alunomodel.dao';
import { alunoDaoInterface } from './alunointerface.dao';


export class alunoDao extends alunoDaoModel implements alunoDaoInterface {

    async find(): Promise<Aluno[]> {
        let alunos = await this.getAll();
        return alunos;
    }
}
