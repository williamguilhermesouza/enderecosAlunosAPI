import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './endereco.entity';
import { enderecoService } from './endereco.service';
import { enderecoController } from './endereco.controller';
import { enderecoDao } from './dao/enderecoimplementation.dao';

// encapsulating all aluno elements
@Module({
    imports: [TypeOrmModule.forFeature([Endereco])],
    providers: [enderecoService, enderecoDao],
    controllers: [enderecoController],

})

export class enderecoModule {}