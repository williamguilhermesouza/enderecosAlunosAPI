import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Aluno } from './alunos/aluno.entity';
import { alunoModule } from './alunos/aluno.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'lemobs',
      entities: [Aluno],
      synchronize: true,
    }),
    alunoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
