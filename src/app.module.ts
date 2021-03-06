import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Aluno } from './alunos/aluno.entity';
import { alunoModule } from './alunos/aluno.module';

import { Endereco } from './enderecos/endereco.entity';
import { enderecoModule } from './enderecos/endereco.module';

import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // 'localhost' if running locally, 'postgres' if on docker compose
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'lemobs',
      entities: [Aluno, Endereco],
      synchronize: true,
    }),
    alunoModule,
    enderecoModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
