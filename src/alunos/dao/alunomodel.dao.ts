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
        let alunos = await this.alunoRepository
            .createQueryBuilder("aluno")
            .select('aluno.id AS id')
            .addSelect('aluno.nome AS nome')
            .addSelect('aluno.data_nascimento AS data_nascimento')
            .addSelect('aluno.nota AS nota')
            .addSelect(`CONCAT(SUBSTR(aluno.cpf,1,3), '.',
                SUBSTR(aluno.cpf, 4,3), '.',
                SUBSTR(aluno.cpf, 7,3), '-',
                SUBSTR(aluno.cpf, 10,3))
                AS cpf`)
            .where(`aluno.id = ${id}`)
            .getRawOne();

        return alunos;
    }

    // delete the aluno with the given id and returns it
    async __delete(id: number): Promise<{}> {
        await this.alunoRepository.delete(id);
        return {'msg': `Successfully deleted aluno with id ${id}`};
    }

    // function that returns an array of all alunos
    async __find(): Promise<Aluno[]> {
        let alunos = await this.alunoRepository
            .createQueryBuilder("aluno")
            .select('aluno.id AS id')
            .addSelect('aluno.nome AS nome')
            .addSelect('aluno.data_nascimento AS data_nascimento')
            .addSelect('aluno.nota AS nota')
            .addSelect(`CONCAT(SUBSTR(aluno.cpf,1,3), '.',
                SUBSTR(aluno.cpf, 4,3), '.',
                SUBSTR(aluno.cpf, 7,3), '-',
                SUBSTR(aluno.cpf, 10,3))
                AS cpf`)
            .getRawMany();
            
        return alunos;    
    }


    // function that returns an aluno with nota matching criterio (lt for < 
    // and bt for >)
    async __getAlunoCriterio(nota: number, criterio: string): Promise<Aluno[]> {
        let alunos = await this.alunoRepository
            .createQueryBuilder("aluno")
            .select('aluno.id AS id')
            .addSelect('aluno.nome AS nome')
            .addSelect('aluno.data_nascimento AS data_nascimento')
            .addSelect('aluno.nota AS nota')
            .addSelect(`CONCAT(SUBSTR(aluno.cpf,1,3), '.', 
                SUBSTR(aluno.cpf, 4,3), '.',
                SUBSTR(aluno.cpf, 7,3), '-',
                SUBSTR(aluno.cpf, 10,3))
                AS cpf`)
            .where(`aluno.nota ${criterio} ${nota}`) // SQLi??
            .getRawMany();

        return alunos;
    }

    // returns an array of aluno that has nota bigger than the average
    // of all aluno nota
    async __approved(): Promise<Aluno[]> {
        let alunos = await this.alunoRepository
            .createQueryBuilder("aluno")
            .select('aluno.id AS id')
            .addSelect('aluno.nome AS nome')
            .addSelect('aluno.data_nascimento AS data_nascimento')
            .addSelect('aluno.nota AS nota')
            .addSelect(`CONCAT(SUBSTR(aluno.cpf,1,3), '.', 
                SUBSTR(aluno.cpf, 4,3), '.',
                SUBSTR(aluno.cpf, 7,3), '-',
                SUBSTR(aluno.cpf, 10,3))
                AS cpf`)
            .where('aluno.nota > ANY (SELECT ROUND(AVG(aluno.nota)) FROM aluno)')
            .getRawMany();

        return alunos;

    }

}