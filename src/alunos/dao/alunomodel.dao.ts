// model to use in dao, it implements getters 
// and setters of data (basic access to DB)
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Aluno } from '../aluno.entity';


// creating an injectable model with the functions
@Injectable()
export class alunoDaoModel {
    //using constructor to inject aluno entity into the service
    constructor(
        @InjectRepository(Aluno)
        private readonly alunoRepository: Repository<Aluno>,
    ) {}

    // method to save or update an aluno
    async save(aluno: Aluno): Promise<Aluno> {
        return await this.alunoRepository.save(aluno); 
    }

    // method to search for an aluno with the given id
    async findOne(id: number): Promise<Aluno> {
        let aluno = await this.alunoRepository.findOne(id);
        return aluno;
    }

    // delete the aluno with the given id and returns it
    async delete(id: number): Promise<Aluno> {
        return await this.alunoRepository.remove(await this.alunoRepository.findOne(id));
    }

    // function that returns an array of all alunos
    async findAll(): Promise<Aluno[]> {
        let alunos = await this.alunoRepository.find();
        return alunos;
    }

    // function that returns an aluno with nota matching criterio (lt for < 
    // and bt for >)
    async getAlunoCriterio(nota: number, criterio: string): Promise<Aluno[]> {
        let alunos = await this.alunoRepository
            .createQueryBuilder("aluno")
            .where(`aluno.nota ${criterio} ${nota}`)
            .getMany();

        return alunos;
    }

    // CAN BE REDUCED TO ONLY 1 QUERY, try select aluno where aluno.nota > avg
    // returns an array of aluno that has nota bigger than the average
    // of all aluno nota
    async approved(): Promise<Aluno[]> {
        let avg =  await this.alunoRepository
            .createQueryBuilder("aluno")
            .select("AVG(aluno.nota)")
            .getRawOne();
            
        avg = Math.round(parseFloat(avg.avg));

        let alunos = await this.alunoRepository
            .createQueryBuilder("aluno")
            .where(`aluno.nota > ${avg}`)
            .getMany();

        return alunos;

    }

}
