import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from '../aluno.entity';

// beginning the model structure working with the basic 
// DB interactions, to separate then from the service

@Injectable()
export class alunoDaoModel {

    //using constructor to inject aluno entity into the service
    constructor(
        @InjectRepository(Aluno)
        private readonly alunoRepository: Repository<Aluno>,
    ) {}

    async __save(aluno: Aluno): Promise<Aluno> {
        return await this.alunoRepository.save(aluno); 
         
    }

    async __update(id: number, aluno: Aluno): Promise<{}> {
        await this.alunoRepository.update(id, aluno);
        return {'msg': `Successfully updated aluno with id ${id}`};
    }

    // returns the aluno with the given id
    async __findOne(id: number): Promise<Aluno> {
        return await this.alunoRepository.findOne(id);
    }

    // delete the aluno with the given id and returns it
    async __delete(id: number): Promise<{}> {
        await this.alunoRepository.delete(id);
        return {'msg': `Successfully deleted aluno with id ${id}`};
    }

    // function that returns an array of all alunos
    async __find(): Promise<Aluno[]> {
        let alunos = await this.alunoRepository.find();
        return alunos;    
    }


    // function that returns an aluno with nota matching criterio (lt for < 
    // and bt for >)
    async __getAlunoCriterio(nota: number, criterio: string): Promise<Aluno[]> {
        let alunos = await this.alunoRepository
            .createQueryBuilder("aluno")
            .where(`aluno.nota ${criterio} ${nota}`)
            .getMany();

        return alunos;
    }

    // returns an array of aluno that has nota bigger than the average
    // of all aluno nota
    async __approved(): Promise<Aluno[]> {
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