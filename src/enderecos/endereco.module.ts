import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './endereco.entity';
import { enderecoService } from './endereco.service';
import { enderecoController } from './endereco.controller';

// encapsulating all aluno elements
@Module({
    imports: [TypeOrmModule.forFeature([Endereco])],
    providers: [enderecoService],
    controllers: [enderecoController],

})

export class enderecoModule {}