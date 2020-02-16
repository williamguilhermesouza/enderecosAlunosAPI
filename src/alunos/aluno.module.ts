import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { aluno } from './aluno.entity';
import { alunoService } from './aluno.service';
import { alunoController } from './aluno.controller';

@Module({
    imports: [TypeOrmModule.forFeature([aluno])],
    providers: [alunoService],
    controllers: [alunoController],

})

export class alunoModule {}