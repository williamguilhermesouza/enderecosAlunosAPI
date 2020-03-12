// database model to work with the dao 

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Endereco } from '../endereco.entity';

// creating an injectable model with the functions
@Injectable()
export class enderecoDaoModel {

    //using constructor to inject aluno entity into the model
    constructor(
        @InjectRepository(Endereco)
        private readonly enderecoRepository: Repository<Endereco>,
    ) {}

    // creates a new endereco in the database
    async __save(endereco: Endereco): Promise<Endereco> {
        return await this.enderecoRepository.save(endereco);
    }

    // returns all enderecos in the database
    async __find(bairro?): Promise<Endereco[]> {
        let enderecos =  await this.enderecoRepository.find();
        
        if (bairro) {
            enderecos = enderecos.filter((endereco) => {
                return endereco.bairro == bairro;
            });    
        }
        return enderecos;
    }

    // makes a query for all the enderecos from the aluno with the given id
    async __queryAlunoEndereco(id: number): Promise<{}> {
        let [enderecos, quantity] = await this.enderecoRepository
            .createQueryBuilder("endereco")
            .select("endereco.rua")
            .addSelect("endereco.numero")
            .addSelect("endereco.complemento")
            .addSelect("endereco.bairro")
            .where(`aluno_id = ${id}`)
            .getManyAndCount();

        // map function for formatting
        const formatedEnderecos = enderecos.map((endereco): {} => {
            return {
                "endereco": `${endereco.rua}, ${endereco.numero} - ${endereco.complemento}`,
                "bairro": endereco.bairro,
            }
        });

        // more formatting
        const queryResults = {
            "total": quantity,
            "enderecos": formatedEnderecos,
        }

        return queryResults;
    }

}