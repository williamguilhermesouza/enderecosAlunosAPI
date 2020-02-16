import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';
import { alunoService } from './aluno.service';
import { alunoController } from './aluno.controller';

// encapsulating all aluno elements
@Module({
    imports: [TypeOrmModule.forFeature([Aluno])],
    providers: [alunoService],
    controllers: [alunoController],

})

export class alunoModule {}