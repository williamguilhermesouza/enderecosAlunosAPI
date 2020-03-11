import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';
import { alunoService } from './aluno.service';
import { alunoController } from './aluno.controller';
import { alunoDao } from './dao/alunoimplementation.dao';

// encapsulating all aluno elements
@Module({
    imports: [TypeOrmModule.forFeature([Aluno])],
    providers: [alunoService, alunoDao],
    controllers: [alunoController],

})

export class alunoModule {}