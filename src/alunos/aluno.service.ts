
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

    cpfOutParser(cpf) {
        cpf = [cpf.slice(0,3), '.', cpf.slice(3,6), '.', cpf.slice(6,9), '-',cpf.slice(9)].join('');
        return cpf;
    }

    // function to create a new aluno
    async create(aluno: Aluno): Promise<Aluno> {
        let cpf = aluno.cpf;
        cpf = cpf.split('.').join('');
        cpf = cpf.split('-').join('');
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
        cpf = cpf.split('.').join('');
        cpf = cpf.split('-').join('');
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
        aluno.cpf = this.cpfOutParser(aluno.cpf);
        return aluno;
    }

    // delete the aluno with the given id and returns a message
    async delete(id: number): Promise<{}> {
        return await this.alunoDao.delete(id);
    }

    // function that returns an array of all alunos
    async findAll(): Promise<Aluno[]> {
        let alunos = await this.alunoDao.findAll();

        alunos.map((aluno) => {
            aluno.cpf = this.cpfOutParser(aluno.cpf);
        });

        return alunos;
        
    }



    // function that returns an aluno with nota matching criterio (lt for < 
    // and bt for >)
    async getAlunoCriterio(nota: number, criterio: string): Promise<Aluno[]> {
        let alunos = await this.alunoDao.getAlunoCriterio(nota, criterio);

        alunos.map((aluno) => {
            aluno.cpf = this.cpfOutParser(aluno.cpf);
        });

        return alunos;
    }

    // returns an array of aluno that has nota bigger than the average
    // of all aluno nota
    async approved(): Promise<Aluno[]> {
        let alunos = await this.alunoDao.approved();

        alunos.map((aluno) => {
            aluno.cpf = this.cpfOutParser(aluno.cpf);
        });

        return alunos;

    }

  
}