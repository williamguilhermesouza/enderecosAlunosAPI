import { Aluno } from './aluno.entity';
import cpfValidator from './utils/cpfValidator';
import { Injectable, BadRequestException } from '@nestjs/common';

import { alunoDao } from './dao/alunoimplementation.dao';

// creating an injectable service with the functions
@Injectable()
export class alunoService {

    //using constructor to inject aluno entity into the service
    constructor(
        private readonly alunoDao: alunoDao,
    ) {}

    // remove dots and dashes from cpf
    cpfInParser(cpf) {
        cpf = cpf.split('.').join('');
        cpf = cpf.split('-').join('');
        return cpf;
    }

    // function to create a new aluno
    async create(aluno: Aluno): Promise<Aluno> {
        let cpf = aluno.cpf;

        cpf = this.cpfInParser(cpf);

        if (cpfValidator(cpf)) {
            aluno.cpf = cpf;
            return await this.alunoDao.create(aluno);
        }
        else {
            throw new BadRequestException(`Invalid CPF: ${aluno.cpf}`);
        }
        
    }

    // function to update an aluno and return a message
    async update(id: number, aluno: Aluno): Promise<{}> {
        let cpf = aluno.cpf;
        
        cpf = this.cpfInParser(cpf);

        if (cpfValidator(cpf)) {
            aluno.cpf = cpf;
            return await this.alunoDao.update(id, aluno);
        }
        else {
            throw new BadRequestException(`Invalid CPF: ${aluno.cpf}`);
        }
    }

    // returns the aluno with the given id
    async findOne(id: number): Promise<Aluno> {
        let aluno = await this.alunoDao.findOne(id);
        return aluno;
    }

    // delete the aluno with the given id and returns a message
    async delete(id: number): Promise<{}> {
        return await this.alunoDao.delete(id);
    }

    // function that returns an array of all alunos
    async findAll(): Promise<Aluno[]> {
        let alunos = await this.alunoDao.findAll();
        return alunos;
        
    }



    // function that returns an aluno with nota matching criterio (lt for < 
    // and bt for >)
    async getAlunoCriterio(nota: number, criterio: string): Promise<Aluno[]> {
        if (criterio != '<' && criterio != '>') {
            throw new BadRequestException(`Invalid criterio: ${criterio}`);
        }
        let alunos = await this.alunoDao.getAlunoCriterio(nota, criterio);
        return alunos;
    }

    // returns an array of aluno that has nota bigger than the average
    // of all aluno nota
    async approved(): Promise<Aluno[]> {
        let alunos = await this.alunoDao.approved();
        return alunos;

    }

  
}