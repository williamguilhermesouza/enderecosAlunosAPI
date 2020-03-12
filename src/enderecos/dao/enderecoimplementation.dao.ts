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
        let enderecos: Endereco[];
        
        if (bairro) {
            enderecos = await this.__filter(bairro);
        }
        else {
            enderecos =  await this.__find();
        }
        
        return enderecos;
    }

    // makes a query for all the enderecos from the aluno with the given id
    async queryAlunoEndereco(id: number): Promise<{}> {
        let query = await this.__queryAlunoEndereco(id);
        
        // map function for formatting
        const formatedEnderecos = query['enderecos'].map((endereco): {} => {
            return {
                "endereco": `${endereco.rua}, ${endereco.numero} - ${endereco.complemento}`,
                "bairro": endereco.bairro,
            }
        });

        query['enderecos'] = formatedEnderecos;

        return query;

    }
}