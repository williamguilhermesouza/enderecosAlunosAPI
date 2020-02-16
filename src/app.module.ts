import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { aluno } from './alunos/aluno.entity';
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
      entities: [aluno],
      synchronize: true,
    }),
    alunoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
