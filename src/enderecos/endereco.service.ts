import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Endereco } from './endereco.entity';

// creating an injectable service with the functions
@Injectable()
export class enderecoService {

    //using constructor to inject aluno entity into the service
    constructor(
        @InjectRepository(Endereco)
        private readonly enderecoRepository: Repository<Endereco>,
    ) {}

    // creates a new endereco in the database
    async create(endereco: Endereco): Promise<Endereco> {
        return await this.enderecoRepository.save(endereco);
    }

    // returns all enderecos in the database
    async findAll(): Promise<Endereco[]> {
        return await this.enderecoRepository.find();
    }

    // makes a query for all the enderecos from the aluno with the given id
    async queryAlunoEndereco(id: number): Promise<{}> {
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