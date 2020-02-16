import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Aluno } from './aluno.entity';

// creating an injectable service with the functions
@Injectable()
export class alunoService {

    //using constructor to inject aluno entity into the service
    constructor(
        @InjectRepository(Aluno)
        private readonly alunoRepository: Repository<Aluno>,
    ) {}

    // function to create a new aluno
    async create(aluno: Aluno): Promise<Aluno> {
        return await this.alunoRepository.save(aluno);
    }

    // if aluno exist, update it, if not create it
    async update(id: number, aluno: Aluno): Promise<Aluno> {
        return await this.alunoRepository.save(aluno);
    }

    // returns the aluno with the given id
    async findOne(id: number): Promise<Aluno> {
        return await this.alunoRepository.findOne(id);
    }

    // delete the aluno with the given id and returns it
    async delete(id: number): Promise<Aluno> {
        return await this.alunoRepository.remove(await this.alunoRepository.findOne(id));
    }

    // function that returns an array of all alunos
    findAll(): Promise<Aluno[]> {
        return this.alunoRepository.find();
    }
}