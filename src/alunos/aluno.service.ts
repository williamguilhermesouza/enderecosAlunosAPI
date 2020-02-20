import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Aluno } from './aluno.entity';
import cpfValidator from './utils/cpfValidator';
import { BadRequestException } from '@nestjs/common';

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
        let cpf = aluno.cpf;
        cpf = cpf.split('.').join('');
        if (cpfValidator(cpf)) {
            aluno.cpf = cpf;
            return await this.alunoRepository.save(aluno); 
        }
        else {
            throw new BadRequestException(`Invalid CPF: ${aluno.cpf}`);
        }
        
    }

    // if aluno exist, update it, if not create it
    async update(id: number, aluno: Aluno): Promise<Aluno> {
        let cpf = aluno.cpf;
        cpf = cpf.split('.').join('');
        if (cpfValidator(cpf)) {
            aluno.cpf = cpf;
            return await this.alunoRepository.save(aluno);
        }
        else {
            throw new BadRequestException(`Invalid CPF: ${aluno.cpf}`);
        }
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
    async findAll(): Promise<Aluno[]> {
        return await this.alunoRepository.find();
    }

    // function that returns an aluno with nota matching criterio (lt for < 
    // and bt for >)
    async getAlunoCriterio(nota: number, criterio: string): Promise<Aluno[]> {
        return await this.alunoRepository
            .createQueryBuilder("aluno")
            .where(`aluno.nota ${criterio} ${nota}`)
            .getMany();
    }

    // returns an array of aluno that has nota bigger than the average
    // of all aluno nota
    async approved(): Promise<Aluno[]> {
        let avg =  await this.alunoRepository
            .createQueryBuilder("aluno")
            .select("AVG(aluno.nota)")
            .getRawOne();
            
        avg = Math.round(parseFloat(avg.avg));

        return await this.alunoRepository
            .createQueryBuilder("aluno")
            .where(`aluno.nota > ${avg}`)
            .getMany();

    }
}