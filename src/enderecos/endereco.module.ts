import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './endereco.entity';
import { enderecoService } from './endereco.service';
import { enderecoController } from './endereco.controller';
import { enderecoDao } from './dao/enderecoimplementation.dao';
import { enderecoResolver } from './endereco.resolver';

// encapsulating all aluno elements
@Module({
    imports: [TypeOrmModule.forFeature([Endereco])],
    providers: [enderecoService, enderecoDao, enderecoResolver],
    controllers: [enderecoController],

})

export class enderecoModule {}
