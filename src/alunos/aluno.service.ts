import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { aluno } from './aluno.entity';

@Injectable()
export class alunoService {
    constructor(
        @InjectRepository(aluno)
        private readonly alunoRepository: Repository<aluno>,
    ) {}

    findAll(): Promise<aluno[]> {
        return this.alunoRepository.find();
    }
}