import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Aluno } from '../aluno.entity';

// beginning the model structure working with the basic 
// CRUD operations, to separate then from the service

@Injectable()
export class alunoDaoModel {

    //using constructor to inject aluno entity into the service
    constructor(
        @InjectRepository(Aluno)
        private readonly alunoRepository: Repository<Aluno>,
    ) {}

    // function that returns an array of all alunos
    async getAll(): Promise<Aluno[]> {
        let alunos = await this.alunoRepository.find();

        return alunos;
    }

}