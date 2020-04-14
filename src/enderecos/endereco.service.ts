import { Injectable } from '@nestjs/common';

import { Endereco } from './endereco.entity';
import { enderecoDao } from './dao/enderecoimplementation.dao';
import enderecoServiceInterface from './endereco.service.interface';

// creating an injectable service with the functions
@Injectable()
export class enderecoService implements enderecoServiceInterface {

    //using constructor to instantiate Dao into the service
    constructor(
        private readonly enderecoDao: enderecoDao,
    ) {}

    // creates a new endereco in the database
    async create(endereco: Endereco): Promise<Endereco> {
        return await this.enderecoDao.save(endereco);
    }

    // returns all enderecos in the database
    async findAll(bairro?): Promise<Endereco[]> {
        let enderecos =  await this.enderecoDao.find(bairro);
        return enderecos;
    }

    // makes a query for all the enderecos from the aluno with the given id
    async queryAlunoEndereco(id: number): Promise<{}> {
        let enderecos = await this.enderecoDao.queryAlunoEndereco(id);
        return enderecos;
    }

}