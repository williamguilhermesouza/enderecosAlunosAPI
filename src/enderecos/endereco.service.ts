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

    async create(endereco: Endereco): Promise<Endereco> {
        return await this.enderecoRepository.save(endereco);
    }

    async findAll(): Promise<Endereco[]> {
        return await this.enderecoRepository.find();
    }

}