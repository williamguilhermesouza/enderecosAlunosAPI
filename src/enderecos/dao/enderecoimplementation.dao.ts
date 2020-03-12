// implementation of the dao functions specified at the interface

import { Endereco } from '../endereco.entity';
import { enderecoDaoModel } from './enderecomodel.dao';
import { enderecoDaoInterface } from './enderecointerface.dao';

export class enderecoDao extends enderecoDaoModel implements enderecoDaoInterface {
    // creates a new endereco in the database
    async save(endereco: Endereco): Promise<Endereco> {
        return await this.__save(endereco);
    }

    // returns all enderecos in the database
    async find(bairro?): Promise<Endereco[]> {
        let enderecos =  await this.__find(bairro);
        return enderecos;
    }

    // makes a query for all the enderecos from the aluno with the given id
    async queryAlunoEndereco(id: number): Promise<{}> {
        let enderecos = await this.__queryAlunoEndereco(id);
        return enderecos;
    }
}